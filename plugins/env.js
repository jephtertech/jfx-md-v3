const config = require('../config');
const { cmd, commands } = require('../command');
const { runtime } = require('../lib/functions');
const axios = require('axios');
const os = require("os");
const fs = require("fs");
const path = require("path");

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
┇๏ *ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ:* ${isEnabled(config.AUTO_STATUS_SEEN) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ꜱᴛᴀᴛᴜꜱ:* ${isEnabled(config.AUTO_STATUS_REPLY) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴘʟʏ:* ${isEnabled(config.AUTO_REPLY) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ꜱᴛɪᴄᴋᴇʀ:* ${isEnabled(config.AUTO_STICKER) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ᴠᴏɪᴄᴇ:* ${isEnabled(config.AUTO_VOICE) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴏᴡɴᴇʀ ʀᴇᴀᴄᴛ:* ${isEnabled(config.OWNER_REACT) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴄᴜꜱᴛᴏᴍ ʀᴇᴀᴄᴛꜱ:* ${isEnabled(config.CUSTOM_REACT) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴀᴄᴛ:* ${isEnabled(config.AUTO_REACT) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴅᴇʟᴇᴛᴇ ʟɪɴᴋꜱ:* ${isEnabled(config.DELETE_LINKS) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀɴᴛɪ-ʟɪɴᴋ:* ${isEnabled(config.ANTI_LINK) ? "Enabled✅" : "Disabled❌"}
┇๏ *ʙᴀᴅ ᴡᴏʀᴅꜱ:* ${isEnabled(config.ANTI_BAD) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ᴛʏᴘɪɴɢ:* ${isEnabled(config.AUTO_TYPING) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀᴜᴛᴏ ʀᴇᴄᴏʀᴅɪɴɢ:* ${isEnabled(config.AUTO_RECORDING) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴀʟᴡᴀʏꜱ ᴏɴʟɪɴᴇ:* ${isEnabled(config.ALWAYS_ONLINE) ? "Enabled✅" : "Disabled❌"}
┇๏ *ᴘᴜʙʟɪᴄ ᴍᴏᴅᴇ:* ${isEnabled(config.PUBLIC_MODE) ? "Enabled✅" : "Disabled❌"}
┇๏ *ʀᴇᴀᴅ ᴍᴇꜱꜱᴀɢᴇ:* ${isEnabled(config.READ_MESSAGE) ? "Enabled✅" : "Disabled❌"}
╰━━━━━━━━━━━━──┈⊷
> ᴍᴀᴅᴇ ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ
> ${config.DESCRIPTION}`;

        // Pick random image from src/
        const imageDir = path.join(__dirname, "../src");
        const images = fs.readdirSync(imageDir).filter(file => file.match(/\.(jpg|png|webp)$/i));
        const randomImage = path.join(imageDir, images[Math.floor(Math.random() * images.length)]);

        // Pick random audio from audio/
        const audioDir = path.join(__dirname, "../audio");
        const audios = fs.readdirSync(audioDir).filter(file => file.match(/\.(mp3|mp4)$/i));
        const randomAudio = path.join(audioDir, audios[Math.floor(Math.random() * audios.length)]);

        // Verified contact (quoted base)
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ 🧚‍♀️\nORG:Vᴇʀᴏɴɪᴄᴀ BOT;\nTEL;type=CELL;type=VOICE;waid=2349046157539:+2349046157539\nEND:VCARD"
                }
            }
        };

        // Channel forwarding context (reusable)
        const channelContext = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420646690174@newsletter',
                newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                serverMessageId: 143
            }
        };

        // Send image + caption with channel context
        await conn.sendMessage(from, { 
            image: fs.readFileSync(randomImage),
            caption: envSettings,
            contextInfo: channelContext
        }, { quoted: verifiedContact });

        // Send random audio (PTT style) with channel context
        await conn.sendMessage(from, { 
            audio: fs.readFileSync(randomAudio),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: channelContext
        }, { quoted: verifiedContact });

    } catch (error) {
        console.log(error);
        reply(`Error: ${error.message}`);
    }
});