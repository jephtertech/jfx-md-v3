const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');

function isEnabled(value) {
    // Function to check if a value represents a "true" boolean state
    return value && value.toString().toLowerCase() === "true";
}

cmd({
    pattern: "env",
    alias: ["settings","setting", "allvar"],
    desc: "Settings of bot",
    category: "menu",
    react: "⤵️",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        // Define the settings message with the correct boolean checks
        let envSettings = `
 ╭〔 *【ᴊꜰx ᴍᴅ-xᴠ3 】* 〕⊷
┃▸╭───────────
┃▸┃๏ *ᴇɴᴠ ꜱᴇᴛᴛɪɴɢꜱ*
┃▸└───────────···๏
╰────────────┈⊷
╭━━〔 *ᴇɴᴀʙʟᴇᴅ / ᴅɪꜱᴀʙʟᴇᴅ* 〕━━┈⊷
┇๏ *ᴀᴜᴛᴏ ʀᴇᴀᴅ ꜱᴛᴀᴛᴜꜱ:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴘʟʏ ꜱᴛᴀᴛᴜꜱ:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴘʟʏ:* ${isEnabled(config.AUTO_REPLY) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ꜱᴛɪᴄᴋᴇʀ:* ${isEnabled(config.AUTO_STICKER) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ:* ${isEnabled(config.AUTO_VOICE) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴏᴡɴᴇʀ ʀᴇᴀᴄᴛ:* ${isEnabled(config.OWNER_REACT) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴄᴜꜱᴛᴏᴍ ʀᴇᴀᴄᴛꜱ:* ${isEnabled(config.CUSTOM_REACT) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ:* ${isEnabled(config.AUTO_REACT) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴅᴇʟᴇᴛᴇ ʟɪɴᴋꜱ:* ${isEnabled(config.DELETE_LINKS) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀɴᴛɪ-ʟɪɴᴋ:* ${isEnabled(config.ANTI_LINK) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀɴᴛɪ-ʙᴀᴅ ᴡᴏʀᴅꜱ:* ${isEnabled(config.ANTI_BAD) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ:* ${isEnabled(config.AUTO_TYPING) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ:* ${isEnabled(config.AUTO_RECORDING) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴀʟᴡᴀʏꜱ ᴏɴʟɪɴᴇ:* ${isEnabled(config.ALWAYS_ONLINE) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ:* ${isEnabled(config.PUBLIC_MODE) ? "Enabled ✅" : "Disabled ❌"}
┇๏ *ʀᴇᴀᴅ ᴍᴇꜱꜱᴀɢᴇ:* ${isEnabled(config.READ_MESSAGE) ? "Enabled ✅" : "Disabled ❌"}
╰━━━━━━━━━━━━──┈⊷
> ᴍᴀᴅᴇ ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ
> ${config.DESCRIPTION}`;

        // Send message with an image
        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' }, // Image URL
                caption: envSettings,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420646690174@newsletter',
                        newsletterName: "ᴊꜰx ᴍᴅ-xᴠ3",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: mek }
        );

        // Send an audio file
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/eqfc2j.mp3' }, // Audio URL
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: mek });

    } catch (error) {
        console.log(error);
        reply(`Error: ${error.message}`);
    }
});
