const { cmd } = require('../command');
const os = require("os");
const fs = require("fs");
const path = require("path");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, pushname, reply }) => {
    try {
        // Get system info
        const platform = "RENDER"; // Fixed deployment platform
        const release = os.release(); 
        const cpuModel = os.cpus()[0].model;
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2);
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2);

        // Stylish status text
        const status = `*Good ${
          new Date().getHours() < 12 ? 'Morning' : 
          (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
        }, ${pushname}!*💫
╭─❰ *ᴊꜰx ᴍᴅ-xᴠ3* ❱─┈⊷
┃ *𝖴ᴘᴛɪᴍᴇ* : *${runtime(process.uptime())}*
┃ *𝖱ᴀᴍ ᴜsᴀɢᴇ* : *${totalMem} MB*
┃ *𝖣ᴇᴘʟᴏʏᴇᴅ ᴏɴ* : *${platform}*
┃ *𝖮ᴡɴᴇʀ* : *ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
┃ *𝖵ᴇʀsɪᴏɴ* : *3.𝟢.𝟢*
╰───────────┈⊷
> ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ`;

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

        // Send image + caption with channel context
        await conn.sendMessage(from, { 
            image: fs.readFileSync(randomImage),
            caption: status,
            contextInfo: channelContext
        }, { quoted: verifiedContact });

        // Send random audio (PTT style) with channel context
        await conn.sendMessage(from, { 
            audio: fs.readFileSync(randomAudio),
            mimetype: 'audio/mp4',
            ptt: true,
            contextInfo: channelContext
        }, { quoted: verifiedContact });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
