const { cmd } = require('../command');
const config = require('../config');
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

const getRandomAudio = () => {
    try {
        const audioPath = path.join(__dirname, '../audio');
        const files = fs.readdirSync(audioPath);
        const audioFiles = files.filter(file => 
            file.endsWith('.mp3') || file.endsWith('.mp4') || file.endsWith('.ogg')
        );
        
        if (audioFiles.length === 0) {
            console.log('No audio files found in audio folder');
            return 'https://files.catbox.moe/eqfc2j.mp3'; 
        }
        
        const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        return path.join(audioPath, randomAudio);
    } catch (e) {
        console.log('Error getting random audio:', e);
        return 'https://files.catbox.moe/eqfc2j.mp3'; 
    }
};

cmd({
    pattern: 'owner',
    react: '🦋',
    desc: 'Get owner number',
    category: 'main',
    filename: __filename
}, async (conn, mek, m, { from }) => {
    try {
        const ownerNumber = config.OWNER_NUMBER;
        const ownerName = config.OWNER_NAME;
        
        // Create vCard
        const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${ownerName}
TEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}
END:VCARD`;

        // Fake verified contact
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
                    vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:${ownerName}\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=${ownerNumber.replace('+', '')}:${ownerNumber}\nEND:VCARD`
                }
            }
        };

        // Send contact
        await conn.sendMessage(from, {
            contacts: {
                displayName: ownerName,
                contacts: [{ vcard }]
            }
        }, { quoted: verifiedContact });

        // Send image with caption
        await conn.sendMessage(from, {
            image: { url: getRandomImage() },
            caption: `╭━━〔 *ᴊꜰx ᴍᴅ-xᴠ3* 〕━━┈⊷
┃❍╭─────────────·๏
┃❍┃★ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ ᴄᴇᴏ
┃❍┃ɴᴀᴍᴇ: - ${ownerName}
┃❍┃ɴᴜᴍ:${ownerNumber}
┃❍┃𝖵ᴇʀsɪᴏɴ: 3.0.0
┃❍└───────────┈⊷
╰──────────────┈⊷
> © ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ`,
            contextInfo: {
                mentionedJid: [ownerNumber.replace('+', '') + '@s.whatsapp.net'],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 143
                }
            }
        }, { quoted: verifiedContact });

        // Send audio
        await conn.sendMessage(from, {
            audio: { url: getRandomAudio() },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (error) {
        console.error(error);
        await conn.sendMessage(from, { 
            text: `❌ An error occurred: ${error.message}` 
        }, { quoted: m });
    }
});