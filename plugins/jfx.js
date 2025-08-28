const config = require('../config');
const { cmd, commands } = require('../command');
const os = require("os");
const { runtime } = require('../lib/functions');
const axios = require('axios');
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
            return 'https://files.catbox.moe/pvhmgv.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/pvhmgv.jpg'; 
    }
};

cmd({
    pattern: "jfx",
    desc: "menu the bot",
    category: "menu",
    react: "🐇",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        const time = runtime(process.uptime());
        
        let dec = `🌟 *Good ${
  new Date().getHours() < 12 ? 'Morning' : 
  (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
}, ${pushname}!* 🌟
╭━《 *ᴊꜰx ᴍᴅ-xᴠ3* 》━┈⊷
┃❍⁠⁠⁠⁠╭──────────
┃❍⁠⁠⁠⁠│▸  Usᴇʀ : ${config.OWNER_NAME}
┃❍⁠⁠⁠⁠│▸  ᴛᴏᴛᴀʟ ᴄᴏᴍᴍᴀɴᴅs : *${totalCommands}*
┃❍⁠⁠⁠⁠│▸  ᴘʟᴀᴛғᴏʀᴍ : 𝐇𝐞𝐫𝐨𝐤𝐮
┃❍⁠⁠⁠⁠│▸  𝖣ᴇᴠᴇʟᴏᴘᴇʀ : ᴛᴇʀʀɪ
┃❍⁠⁠⁠⁠│▸  𝖬ᴏᴅᴇ : [${config.MODE}]
┃❍⁠⁠⁠⁠│▸  𝖯ʀᴇғɪx : *[${config.PREFIX}]*
┃❍⁠⁠⁠⁠│▸  ᴛɪᴍᴇ : *${time}*
┃❍⁠⁠⁠⁠│▸  𝖵ᴇʀsɪᴏɴ : 𝟏.𝟎.𝟎
┃❍⁠⁠⁠⁠╰──────────
╰━━━━━━━━━━━┈⊷
╭━━〔 𝐌𝐄𝐍𝐔𝐋𝐈𝐒𝐓 〕━━┈⊷
┃❍╭───────────·
┃❍┃• ᴘʀᴀʏᴇʀᴛɪᴍᴇ
┃❍┃• ϙᴜʀᴀɴᴍᴇɴᴜ
┃❍┃• ᴀɪᴍᴇɴᴜ
┃❍┃• ᴀɴɪᴍᴇᴍᴇɴᴜ
┃❍┃• ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
┃❍┃• ғᴜɴᴍᴇɴᴜ
┃❍┃• ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ
┃❍┃• ᴅʟᴍᴇɴᴜ
┃❍┃• sᴇᴛᴛɪɴɢsᴍᴇɴᴜ
┃❍┃• ʟɪsᴛᴄᴍᴅ
┃❍┃• ᴍᴀɪɴᴍᴇɴᴜ
┃❍┃• ᴛᴇᴍᴘᴍᴀɪʟ
┃❍┃• ɢʀᴏᴜᴘᴍᴇɴᴜ
┃❍┃• ᴀʟʟᴍᴇɴᴜ
┃❍┃• ᴏᴛʜᴇʀᴍᴇɴᴜ
┃❍┃• ᴏᴡɴᴇʀᴍᴇɴᴜ
┃❍┃• ʟᴏɢᴏ<𝐭𝐞𝐱𝐭>
┃❍┃• ʀᴇᴘᴏ
┃❍┃• ʟᴏɢᴏᴍᴇɴᴜ
┃❍┃• �ᴘᴇsᴀᴍᴇɴᴜ
┃❍┃• ᴀᴅᴜʟᴛᴍᴇɴᴜ
┃❍└───────────┈⊷
╰─────────────┈⊷
> ${config.DESCRIPTION}`;
        
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
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊꜰx ᴍᴅ-xᴠ3\nORG:ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: dec,
                contextInfo: {
                    forwardingScore: 5,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420646690174@newsletter', 
                        newsletterName: "ᴊꜰx ᴍᴅ-xᴠ3",
                        serverMessageId: 143
                    }
                }
            },
            { quoted: verifiedContact }
        );

        const audioUrls = [
            'https://files.catbox.moe/eqfc2j.mp3'
        ];
        const randomAudioUrl = audioUrls[Math.floor(Math.random() * audioUrls.length)];

        await conn.sendMessage(from, {
            audio: { url: randomAudioUrl },
            mimetype: 'audio/mp4',
            ptt: true
        }, { quoted: verifiedContact });

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
