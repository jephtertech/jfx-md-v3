const { cmd } = require('../command');
const { sleep } = require('../lib/functions');
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "restart",
    desc: "Restart the bot VERONICA BOT",
    category: "owner",
    filename: __filename
},
async (conn, mek, m, {
    from, quoted, body, isCmd, command, args, q, isGroup, senderNumber, reply
}) => {
    try {
        // Get the bot owner's number dynamically from conn.user.id
        const botOwner = conn.user.id.split(":")[0]; // Extract the bot owner's number
        if (senderNumber !== botOwner) {
            return reply("⚠️ Only the bot owner can use this command.");
        }

        const { exec } = require("child_process");

        // Pick random image from src/
        const imageDir = path.join(__dirname, "../src");
        const images = fs.readdirSync(imageDir).filter(file => file.match(/\.(jpg|png|webp)$/i));
        const randomImage = path.join(imageDir, images[Math.floor(Math.random() * images.length)]);

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

        // Send initial message with image
        await conn.sendMessage(from, { 
            image: fs.readFileSync(randomImage),
            caption: "🔄 Restarting ᴊꜰx ᴍᴅ-xᴠ3... Please wait...",
            contextInfo: channelContext
        }, { quoted: verifiedContact });
        
        await sleep(1500);
        
        // Send confirmation message with image
        await conn.sendMessage(from, { 
            image: fs.readFileSync(randomImage),
            caption: "✅ Restart command received. Bot will restart now! WAIT 1 MINUTE BEFORE CMD",
            contextInfo: channelContext
        }, { quoted: verifiedContact });
        
        // Execute restart command
        exec("pm2 restart all", (error, stdout, stderr) => {
            if (error) {
                console.error(`Error during restart: ${error}`);
                // Send error message if restart fails
                conn.sendMessage(from, { 
                    image: fs.readFileSync(randomImage),
                    caption: `❌ Restart failed: ${error.message}`,
                    contextInfo: channelContext
                }, { quoted: verifiedContact });
                return;
            }
            console.log(`Restart successful: ${stdout}`);
        });
    } catch (e) {
        console.error(e);
        // In case of error, send error message with features
        const imageDir = path.join(__dirname, "../src");
        const images = fs.readdirSync(imageDir).filter(file => file.match(/\.(jpg|png|webp)$/i));
        const randomImage = path.join(imageDir, images[Math.floor(Math.random() * images.length)]);

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

        await conn.sendMessage(from, { 
            image: fs.readFileSync(randomImage),
            caption: `❌ An error occurred: ${e.message}`,
            contextInfo: channelContext
        }, { quoted: verifiedContact });
    }
});