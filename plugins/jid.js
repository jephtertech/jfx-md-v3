const { cmd } = require('../command');

cmd({
    pattern: "jid",
    desc: "Get the JID of the user or group with newsletter format.",
    react: "📍",
    category: "group",
    filename: __filename,
}, async (conn, mek, m, { from, isGroup, sender, reply }) => {
    try {
        // Newsletter message configuration
        const newsletterConfig = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420646690174@newsletter',
                newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                serverMessageId: 143
            }
        };

        // Prepare the appropriate response
        const response = isGroup 
            ? `🔍 *★ɢʀᴏᴜᴘ ᴊɪᴅ*\n${from}`
            : `👤 *★ʏᴏᴜʀ ᴊɪᴅ*\n${sender}@s.whatsapp.net`;

        // Send the newsletter-style message
        await conn.sendMessage(from, {
            text: response,
            contextInfo: newsletterConfig
        });

    } catch (e) {
        console.error("Error:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});
