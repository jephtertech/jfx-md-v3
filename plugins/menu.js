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
            return 'https://files.catbox.moe/tejxaj.jpg'; 
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcPath, randomImage);
    } catch (e) {
        console.log('Error getting random image:', e);
        return 'https://files.catbox.moe/cz7xle.jpgg'; 
    }
};

cmd({
    pattern: "menu4",
    desc: "menu the bot",
    category: "menu",
    react: "🪀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const totalCommands = Object.keys(commands).length;
        let dec = ` *Good ${
  new Date().getHours() < 12 ? 'Morning' : 
  (new Date().getHours() < 18 ? 'Afternoon' : 'Evening')
}, ${pushname}!*
╭━〔 ⚡ *ᴊꜰx ᴍᴅ-xᴠ3* ⚡ 〕━⊷
┃ ✦ 𝖴sᴇʀ : ${config.OWNER_NAME}
┃ ✦ ᴄᴏᴍᴍᴀɴᴅs : *${totalCommands}*
┃ ✦ ᴛʏᴘᴇ : ɴᴏᴅᴇᴊs
┃ ✦ ᴘʟᴀᴛғᴏʀᴍ : ʀᴇɴᴅᴇʀ
┃ ✦ ᴅᴇᴠᴇʟᴏᴘᴇʀ : ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ
┃ ✦ ᴍᴏᴅᴇ : [${config.MODE}]
┃ ✦ ᴘʀᴇғɪx : *[${config.PREFIX}]*
┃ ✦ ᴛɪᴍᴇ : *${new Date().toLocaleTimeString()}*
┃ ✦ ᴠᴇʀsɪᴏɴ : 3.0.0
╰━━━━━━━━━━━━━━⊷

╭━━〔 📜 ᴍᴇɴᴜʟɪsᴛ 〕━━⊷
┃ ✪ ᴘʀᴀʏᴇʀᴛɪᴍᴇ
┃ ✪ ϙᴜʀᴀɴᴍᴇɴᴜ
┃ ✪ ᴀɪᴍᴇɴᴜ
┃ ✪ ᴀɴɪᴍᴇᴍᴇɴᴜ
┃ ✪ ᴄᴏɴᴠᴇʀᴛᴍᴇɴᴜ
┃ ✪ ғᴜɴᴍᴇɴᴜ
┃ ✪ ʀᴇᴀᴄᴛɪᴏɴᴍᴇɴᴜ
┃ ✪ ᴅʟᴍᴇɴᴜ
┃ ✪ sᴇᴛᴛɪɴɢsᴍᴇɴᴜ
┃ ✪ ʟɪsᴛᴄᴍᴅ
┃ ✪ ᴍᴀɪɴᴍᴇɴᴜ
┃ ✪ ᴛᴇᴍᴘᴍᴀɪʟ
┃ ✪ ɢʀᴏᴜᴘᴍᴇɴᴜ
┃ ✪ ᴀʟʟᴍᴇɴᴜ
┃ ✪ ᴏᴛʜᴇʀᴍᴇɴᴜ
┃ ✪ ᴏᴡɴᴇʀᴍᴇɴᴜ
┃ ✪ ʟᴏɢᴏ <ᴛᴇxᴛ>
┃ ✪ ʀᴇᴘᴏ
┃ ✪ ʟᴏɢᴏᴍᴇɴᴜ
┃ ✪ ᴀᴅᴜʟᴛᴍᴇɴᴜ
╰━━━━━━━━━━━━━━⊷
> ${config.OWNER_NAME}`;

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
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊꜰx ᴍᴅ-xᴠ3\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };

        await conn.sendMessage(
            from,
            {
                image: { url: getRandomImage() },
                caption: dec,
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

// dlmenu

cmd({
    pattern: "dlmenu",
    desc: "menu the bot",
    category: "menu",
    react: "💚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
╭━━━〔 *ᴅᴏᴡɴʟᴏᴀᴅ ᴍᴇɴᴜ* 〕━━━┈⊷
┃✦╭─────────────────╮
┃✦│ • ꜰᴀᴄᴇʙᴏᴏᴋ
┃✦│ • ᴍᴇᴅɪᴀꜰɪʀᴇ
┃✦│ • ᴛɪᴋᴛᴏᴋ
┃✦│ • ᴛᴡɪᴛᴛᴇʀ
┃✦│ • ɪɴꜱᴛᴀ
┃✦│ • ᴀᴘᴋ
┃✦│ • ɪᴍɢ
┃✦│ • ꜱᴘᴏᴛɪꜰʏ
┃✦│ • ᴘʟᴀʏ|ᴘʟᴀʏ2|ᴘʟᴀʏ3
┃✦│ • ᴛᴛ2
┃✦│ • ᴀᴜᴅɪᴏ |ᴘʟᴀʏx
┃✦│ • ᴠɪᴅᴇᴏ |ᴠɪᴅᴇᴏ1
┃✦│ • ʏᴛᴍᴘ3 |ʏᴛᴍᴘ4
┃✦│ • ᴘᴅꜰ |ꜱꜱꜱ
┃✦│ • ꜱᴏɴɢ |ᴅʀᴀᴍᴀ
┃✦│ • ɢɪᴛ |ɢᴅʀɪᴠᴇ
┃✦│ • ꜱᴍᴏᴠɪᴇ |ʙᴀɪꜱᴄᴏᴘᴇ
┃✦│ • ɢɪɴɪꜱɪʟɪᴀ |ʙɪʙʟᴇ
┃✦│ • ᴍᴘ3 |ᴍᴘ4
┃✦│ • ɢᴇᴍɪɴɪ |ᴡʜᴀᴛ ɪꜱ ᴛʜɪꜱ ❓
┃✦╰─────────────────╯
╰━━━━━━━━━━━━━━━━━━━┈⊷

> ${config.OWNER_NAME}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/7w1yde.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// group menu

cmd({
    pattern: "groupmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
╭━━━〔 *ɢʀᴏᴜᴘ ᴍᴇɴᴜ* 〕━━━┈⊷
┃✦╭─────────────────╮
┃✦│ • ɢʀᴏᴜᴘʟɪɴᴋ|ɪɴᴠɪᴛᴇ|ʀᴇᴠᴏᴋᴇ
┃✦│ • ᴀᴅᴅ|ʀᴇᴍᴏᴠᴇ|ᴋɪᴄᴋ|ᴅɪꜱᴍɪꜱꜱ
┃✦│ • ᴋɪᴄᴋᴀʟʟ|ᴋɪᴄᴋᴀʟʟ2|ᴋɪᴄᴋᴀʟʟ3
┃✦│ • ᴘʀᴏᴍᴏᴛᴇ|ᴅᴇᴍᴏᴛᴇ
┃✦│ • ꜱᴇᴛᴡᴇʟᴄᴏᴍᴇ|ꜱᴇᴛɢᴏᴏᴅʙʏᴇ
┃✦│ • ᴅᴇʟᴇᴛᴇ|ɢᴇᴛᴘɪᴄ|ɢɪɴꜰᴏ
┃✦│ • ᴅɪꜱᴀᴘᴘᴇᴀʀ ᴏɴ|ᴏꜰꜰ|7ᴅ/24ʜ
┃✦│ • ᴀʟʟʀᴇQ|ᴊᴏɪɴʀᴇQᴜᴇꜱᴛꜱ
┃✦│ • ᴜᴘᴅᴀᴛᴇɢɴᴀᴍᴇ|ᴜᴘᴅᴀᴛᴇɢᴅᴇꜱᴄ
┃✦│ • ꜱᴇɴᴅᴅᴍ|ɴɪᴋᴀʟ
┃✦│ • ᴍᴜᴛᴇ|ᴜɴᴍᴜᴛᴇ
┃✦│ • ʟᴏᴄᴋɢᴄ|ᴜɴʟᴏᴄᴋɢᴄ
┃✦│ • ᴛᴀɢ|ʜɪᴅᴇᴛᴀɢ|ᴛᴀɢᴀʟʟ
┃✦│ • ᴛᴀɢᴀᴅᴍɪɴꜱ
┃✦╰───────────────╯
╰━━━━━━━━━━━━━━━⊷

> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/j5jjt6.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

cmd({
    pattern: "reactionmenu",
    desc: "Shows the reaction commands",
    category: "menu",
    react: "💫",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, reply }) => {
    try {
        let dec = `
 ╭━━〔 Reactions Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• bully 
┃◈┃• cuddle 
┃◈┃• cry 
┃◈┃• hug 
┃◈┃• awoo 
┃◈┃• kiss 
┃◈┃• lick 
┃◈┃• pat 
┃◈┃• smug 
┃◈┃• bonk
┃◈┃• yeet 
┃◈┃• blush 
┃◈┃• smile
┃◈┃• wave 
┃◈┃• highfive 
┃◈┃• handhold 
┃◈┃• nom 
┃◈┃• bite 
┃◈┃• glomp 
┃◈┃• slap
┃◈┃• kill
┃◈┃• happy
┃◈┃• wink 
┃◈┃• poke 
┃◈┃• dance 
┃◈┃• cringe 
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/7w1yde.jpg' },
                caption: dec,
                contextInfo: {
                    mentionedJid: [m.sender],
                    forwardingScore: 999,
                    isForwarded: true,
                    forwardedNewsletterMessageInfo: {
                        newsletterJid: '120363420646690174@newsletter',
                        newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                        serverMessageId: 144
                    }
                }
            },
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// fun menu

cmd({
    pattern: "funmenu",
    desc: "menu the bot",
    category: "menu",
    react: "😎",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 ╭━━〔 Fun Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• insult
┃◈┃• compatibility
┃◈┃• aura
┃◈┃• roast
┃◈┃• compliment
┃◈┃• lovetest
┃◈┃• emoji
┃◈┃• ringtone 
┃◈┃• pickup
┃◈┃• ship
┃◈┃• character
┃◈┃• hack
┃◈┃• joke
┃◈┃• hrt
┃◈┃• hpy
┃◈┃• syd
┃◈┃• anger
┃◈┃• shy
┃◈┃• kiss
┃◈┃• mon
┃◈┃• cunfuzed
┃◈┃• setpp
┃◈┃• hand
┃◈┃• nikal
┃◈┃• hold
┃◈┃• hug
┃◈┃• nikal
┃◈┃• hifi
┃◈┃• poke
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/7kl8va.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// settings menu

cmd({
    pattern: "settingsmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
     〘 𝖲𝖤𝖳𝖳𝖨𝖭𝖦𝖲 𝗠𝗘𝗡𝗨 〙

╭─────────────⪼
┋ ☻ setprefix 
┋ ☻ statusview
┋ ☻ mode
┋ ☻ statusreply
┋ ☻ alwaysonline
┋ ☻ autorecording
┋ ☻ autotyping
┋ ☻ setbotnumber
┋ ☻ autovoice
┋ ☻ autosticker
┋ ☻ autoreply
┋ ☻ autoreply
┋ ☻ statusreact
┋ ☻ autoreact
┋ ☻ welcome
┋ ☻ customreacts
┋ ☻ antibad
┋ ☻ antibot
┋ ☻ antilink
┋ ☻ readmessage
┋ ☻ settings
╰━━━━∙⋆⋅⋆∙━ ─ • ─┉─⊷

> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/cz7xle.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// other menu

cmd({
    pattern: "othermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
╭━━〔 Other Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• vv
┃◈┃• pair
┃◈┃• pair2
┃◈┃• fact
┃◈┃• font
┃◈┃• define
┃◈┃• news
┃◈┃• movie
┃◈┃• weather
┃◈┃• srepo
┃◈┃• insult
┃◈┃• save
┃◈┃• wikipedia
┃◈┃• gpass
┃◈┃• githubstalk
┃◈┃• yts
┃◈┃• ytv
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/cz7xle.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// main menu

cmd({
    pattern: "mainmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🗿",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 ╭━━〔 Main Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ping
┃◈┃• live 
┃◈┃• alive
┃◈┃• runtime
┃◈┃• uptime 
┃◈┃• repo
┃◈┃• owner
┃◈┃• menu
┃◈┃• menu2
┃◈┃• restart
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// owner menu

cmd({
    pattern: "ownermenu",
    desc: "menu the bot",
    category: "menu",
    react: "🔰",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 ╭━━〔 Owner Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• owner
┃◈┃• menu
┃◈┃• menu2
┃◈┃• listcmd
┃◈┃• allmenu
┃◈┃• repo
┃◈┃• block
┃◈┃• unblock
┃◈┃• fullpp
┃◈┃• setpp
┃◈┃• restart
┃◈┃• shutdown
┃◈┃• updatecmd
┃◈┃• alive
┃◈┃• ping 
┃◈┃• gjid
┃◈┃• jid
┃◈┃• casey
┃◈┃• tinyurl 
┃◈┃• bibelist
┃◈┃• get
┃◈┃• Terminate
┃◈┃• family 
┃◈┃• test
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// convert menu

cmd({
    pattern: "convertmenu",
    desc: "menu the bot",
    category: "menu",
    react: "🥀",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
╭━━〔 Convert Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• sticker
┃◈┃• sticker2
┃◈┃• fancy
┃◈┃• photo
┃◈┃• take
┃◈┃• tomp3
┃◈┃• tts
┃◈┃• trt
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// anime menu 

cmd({
    pattern: "animemenu",
    desc: "menu the bot",
    category: "menu",
    react: "🧚",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `╭━━〔 Anime Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• fack
┃◈┃• dog
┃◈┃• awoo
┃◈┃• garl
┃◈┃• waifu
┃◈┃• neko
┃◈┃• megnumin
┃◈┃• neko
┃◈┃• maid
┃◈┃• loli
┃◈┃• animegirl
┃◈┃• animegirl
┃◈┃• animegirl1
┃◈┃• animegirl2
┃◈┃• animegirl3
┃◈┃• animegirl4
┃◈┃• animegirl5
┃◈┃• anime1
┃◈┃• anime1
┃◈┃• anime2
┃◈┃• anime3
┃◈┃• anime4
┃◈┃• anime5
┃◈┃• animenews
┃◈┃• foxgirl
┃◈┃• naruto
┃◈└───────────┈⊷
╰──────────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});

// ai menu 

cmd({
    pattern: "aimenu",
    desc: "menu the bot",
    category: "menu",
    react: "🤖",
    filename: __filename
}, 
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let dec = `
 ╭━━〔 Ai Menu 〕━━┈⊷
┃◈╭─────────────·๏
┃◈┃• ai
┃◈┃• gpt
┃◈┃• meta
┃◈┃• blackbox
┃◈┃• gpt3
┃◈┃• bing
┃◈┃• gemini
┃◈┃• copilot
┃◈└─────────┈⊷
╰───────────┈⊷
> ${config.DESCRIPTION}`;

        await conn.sendMessage(
            from,
            {
                image: { url: 'https://files.catbox.moe/weux9l.jpg' },
                caption: dec,
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
            { quoted: mek }
        );

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
