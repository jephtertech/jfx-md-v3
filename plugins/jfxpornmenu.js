const axios = require("axios");
const { cmd } = require("../command");
const fs = require('fs');
const path = require('path');

const getRandomImage = () => {
    try {
        const srcPath = path.join(__dirname, '../src');
        const files = fs.readdirSync(srcPath);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || file.endsWith('.png') || file.endsWith('.jpeg')
        );
        
        if (imageFiles.length === 0) {
            console.log('No image files found in src folder');
            return 'https://files.catbox.moe/tejxaj.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/tejxaj.jpg'; 
    }
};

cmd({
    pattern: "adult",
    alias: ["adultmenu"],
    desc: "menu the bot",
    category: "menu",
    react: "🎀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
*╭──❍「 18+ CMD🔞」❍*
‎*├⬡ .xᴠɪᴅᴇᴏ*
‎*├⬡ .ᴘᴏʀɴ*
‎*├⬡ .xᴠɪᴅᴇᴏs*
‎*├⬡ .ʀᴀɴᴅᴏᴍᴘᴏʀɴ*
‎*├⬡ .ʀᴀɴᴅᴏᴍxᴠɪᴅᴇᴏ*
‎*╰───────────❍*`;

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

        const imagePath = getRandomImage();
        const imageContent = imagePath.startsWith('http') ? { url: imagePath } : fs.readFileSync(imagePath);

        await conn.sendMessage(
            from,
            {
                image: imageContent,
                caption: dec,
                contextInfo: channelContext
            },
            { quoted: verifiedContact }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});