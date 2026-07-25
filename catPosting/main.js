async function postCat(api) {
    try {
        const res = await fetch('https://api.thecatapi.com/v1/images/search');
        if (!res.ok) throw new Error(`Cat API returned HTTP ${res.status}`);
        const [{ url }] = await res.json();

        const channel = await api.getChannel(api.config.channel_id);
        if (!channel) {
            api.log('Configured channel not found — skipping this post.');
            return;
        }

        await channel.send({ embeds: [{ title: '🐱 Random cat!', image: { url }, color: 0xFFA500 }] });
    } catch (err) {
        api.log('Failed to post cat image:', err.message);
    }
}

module.exports = {
    register(api) {
        if (!api.config.channel_id) {
            api.log('No channel_id configured yet — run /plugin configure to set one. Not scheduling posts.');
            return;
        }

        const minutes = api.config.interval_minutes || 60;
        api.setInterval(() => postCat(api), minutes * 60 * 1000);
        api.log(`Scheduled cat posts every ${minutes} minute(s) in channel ${api.config.channel_id}.`);
    },

    unregister(api) {
        api.log('Cat poster stopped.');
    }
};
