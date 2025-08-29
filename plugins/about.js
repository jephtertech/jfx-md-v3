const fs = require("fs");
const path = require("path");
const config = require("../config");
const { cmd } = require("../command");

cmd({
    pattern: "about",
    alias: ["jephter","whois"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async (conn, mek, m, {
    from, pushname, reply
}) => {
    try {
        // Spin random image from src/
        const imgDir = path.join(__dirname, "../src");
        const images = fs.readdirSync(imgDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
        const selectedImage = images.length > 0 ? path.join(imgDir, images[Math.floor(Math.random() * images.length)]) : null;

        // Spin random audio from audio/
        const audioDir = path.join(__dirname, "../audio");
        const audios = fs.readdirSync(audioDir).filter(f => f.match(/\.(mp3|mp4|wav)$/i));
        const selectedAudio = audios.length > 0 ? path.join(audioDir, audios[Math.floor(Math.random() * audios.length)]) : null;

        // About caption
        let about = `
*╭━〔 ᴊꜰx ᴍᴅ-xᴠ3 〕━┈⊷*
*👋 HELLO _${pushname}_*
*╰────────────┈⊷*

> *╭───〔 𝗔𝗯𝗼𝘂𝘁 𝗠𝗲 〕───╮*
> *┃Creator  : ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
> *┃Real Name: ᴊᴇᴘʜᴛᴇʀ*
> *┃Alias    : ᴊꜰx ᴍᴅ-xᴠ3*
> *┃Age      : Secret 😎*
> *┃Location : Lagos, Nigeria 🇳🇬*
> *┃Tech     : Node.js + Baileys*
> *┃Status   : Online & Ready*
> *╰────────────────╯*

*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
*•────────────•⟢*
`;

        // Verified contact (quote style)
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };

        // Channel forward info (used for both image & audio)
        const channelContext = {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: "120363420646690174@newsletter", // your channel JID
                newsletterName: "ᴊꜰx ᴍᴅ-xᴠ3",                  // channel name
                serverMessageId: 999                           // random ID
            }
        };

        // Send image + caption
        await conn.sendMessage(from, {
            image: selectedImage ? { url: selectedImage } : null,
            caption: about,
            contextInfo: channelContext
        }, { quoted: verifiedContact });

        // Send random audio (ptt style)
        if (selectedAudio) {
            await conn.sendMessage(from, {
                audio: { url: selectedAudio },
                mimetype: "audio/mp4",
                ptt: true,
                contextInfo: channelContext
            }, { quoted: verifiedContact });
        }

    } catch (e) {
        console.log(e);
        reply(`${e}`);
    }
});
