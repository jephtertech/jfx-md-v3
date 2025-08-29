const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "support",
    alias : "version",
    desc: " allmenu",
    category: "allmenu",
    react: "🫅",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {

let dec = `    
⟣──────────────────⟢
▧ *ᴄʀᴇᴀᴛᴏʀ* :*ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
▧ *ᴍᴏᴅᴇ* : *${config.MODE}*
▧ *ᴘʀᴇғɪx* : *${config.PREFIX}*
▧ *ʀᴀᴍ* : ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
▧ *ᴠᴇʀsɪᴏɴ* : *V3.0.0* ⚡
▧ *ᴜᴘᴛɪᴍᴇ* : ${runtime(process.uptime())}
⟣────────────⟢
> ᴊꜰx ᴍᴅ-xᴠ3
⟣────────────⟢

\`CHANNEL🛠️\`
https://whatsapp.com/channel/0029VbAxkJl0lwgqAOojKI3R

\`ᴊꜰx ᴍᴅ-xᴠ3\` *Dev🧑‍💻*
wa.me/+2349046157539?text=Support!

⟣────────────⟢

`;

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
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ 🧚‍♀️\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=2349046157539:+2349046157539\nEND:VCARD"
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

await conn.sendMessage(
            from,
            {
                image: fs.readFileSync(randomImage),
                caption: dec,
                contextInfo: channelContext
            },
            { quoted: verifiedContact }
        );

        // Send audio
        await conn.sendMessage(from, {
            audio: fs.readFileSync(randomAudio),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: channelContext
        }, { quoted: verifiedContact });
        
    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});