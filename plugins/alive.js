const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');

cmd({
    pattern: "alive",
    alias: ["av", "runtime", "uptime"],
    desc: "Check uptime and system status",
    category: "main",
    react: "📟",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Get system info
        const platform = "RENDER"; // Fixed deployment platform
        const release = os.release(); // OS version
        const cpuModel = os.cpus()[0].model; // CPU info
        const totalMem = (os.totalmem() / 1024 / 1024).toFixed(2); // Total RAM in MB
        const usedMem = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2); // Used RAM in MB

        // Stylish and detailed system status message
        const status = `*Good ${
  new Date().getHours() < 12 ? 'Morning' : 
  (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
}, ${pushname}!*💫
╭─❰ *ᴊꜰx ᴍᴅ-xᴠ3* ❱─┈⊷
┃ *𝖴ᴘᴛɪᴍᴇ* : *${runtime(process.uptime())}*
┃ *𝖱ᴀᴍ ᴜsᴀɢᴇ* : *${usedMem}MB / ${totalMem}MB*
┃ *𝖣ᴇᴘʟᴏʏᴇᴅ ᴏɴ* : *${platform}*
┃ *𝖮ᴡɴᴇʀ* :*ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
┃ *𝖵ᴇʀsɪᴏɴ* : *3.𝟢.𝟢*
╰───────────┈⊷
> ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ`;
          
        // Contact message for verified context
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ 🧚‍♀️\nORG:Vᴇʀᴏɴɪᴄᴀ BOT;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };
        
        // Send image + caption + audio combined
        await conn.sendMessage(from, { 
            image: { url: `https://files.catbox.moe/3287mw.jpg` },  
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 143
                   }
                }
            },
            { quoted: verifiedContact }
        );

        // Attach audio within the same "quoted" message for grouping
        await conn.sendMessage(from, { 
            audio: { url: 'https://files.catbox.moe/eqfc2j.mp3' },
            mimetype: 'audio/mp4',
            ptt: true 
             }, { quoted: verifiedContact });

    } catch (e) {
        console.error("Error in alive command:", e);
        reply(`🚨 *An error occurred:* ${e.message}`);
    }
});
