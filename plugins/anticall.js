const { cmd } = require("../command");
const config = require("../config");
const fs = require("fs");
const path = require("path");

const recentCallers = new Set();

// ✅ Verified Contact (reuse across both parts)
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

// ✅ Common channel forward context
const channelContext = {
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: '120363420646690174@newsletter',
        newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
        serverMessageId: 143
    }
};

// Anti-call event handler
cmd({ on: "body" }, async (client, message, chat, { from: sender }) => {
    try {
        client.ev.on("call", async (callData) => {
            if (!config.ANTI_CALL) return;

            for (const call of callData) {
                if (call.status === 'offer' && !call.isGroup) {
                    await client.rejectCall(call.id, call.from);
                    
                    if (!recentCallers.has(call.from)) {
                        recentCallers.add(call.from);

                        // Random image from /src
                        const srcDir = path.join(__dirname, "../src");
                        const images = fs.readdirSync(srcDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
                        const selectedImage = images.length > 0 
                            ? path.join(srcDir, images[Math.floor(Math.random() * images.length)]) 
                            : null;

                        await client.sendMessage(call.from, {
                            image: selectedImage ? fs.readFileSync(selectedImage) : null,
                            caption: "```ʜɪ ᴛʜɪꜱ ɪꜱ ᴊꜰx ᴍᴅ-xᴠ3 ᴀ ᴘᴇʀꜱᴏɴᴀʟ ᴀꜱꜱɪꜱᴛᴀɴᴛ!! ᴄᴀʟʟꜱ ᴀʀᴇ ɴᴏᴛ ᴀʟʟᴏᴡᴇᴅ. ꜰᴏʀ ꜱᴜᴘᴘᴏʀᴛ, ᴄʜᴀᴛ ᴏᴡɴᴇʀ.```",
                            contextInfo: { ...channelContext, mentionedJid: [call.from] }
                        }, { quoted: verifiedContact });
                        
                        setTimeout(() => recentCallers.delete(call.from), 600000);
                    }
                }
            }
        });
    } catch (error) {
        console.error("Call rejection error:", error);
        await client.sendMessage(sender, { text: "⚠️ Error: " + error.message }, { quoted: chat });
    }
});

// Anti-call command with random local image + verified contact
cmd({
    pattern: "anticall",
    alias: ["callblock", "togglecall"],
    desc: "Toggle call blocking feature",
    category: "owner",
    react: "📞",
    filename: __filename,
    fromMe: true
},
async (client, message, m, { isOwner, from, sender, args }) => {
    try {
        if (!isOwner) {
            return client.sendMessage(from, { 
                text: "ᴏᴡɴᴇʀ-ᴏɴʟʏ ᴄᴏᴍᴍᴀɴᴅ",
                mentions: [sender]
            }, { quoted: message });
        }

        const action = args[0]?.toLowerCase() || 'status';
        let statusText, reaction = "📞", additionalInfo = "";

        switch (action) {
            case 'on':
                if (config.ANTI_CALL) {
                    statusText = "ᴀɴᴛɪ-ᴄᴀʟʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ *ᴇɴᴀʙʟᴇᴅ*";
                    reaction = "ℹ️";
                } else {
                    config.ANTI_CALL = true;
                    statusText = "ᴀɴᴛɪ-ᴄᴀʟʟ ʜᴀꜱ ʙᴇᴇɴ *ᴇɴᴀʙʟᴇᴅ*! ✅";
                    additionalInfo = "ᴄᴀʟʟꜱ ᴡɪʟʟ ʙᴇ ᴀᴜᴛᴏ-ʀᴇᴊᴇᴄᴛᴇᴅ";
                    reaction = "✅";
                }
                break;
                
            case 'off':
                if (!config.ANTI_CALL) {
                    statusText = "ᴀɴᴛɪ-ᴄᴀʟʟ ɪꜱ ᴀʟʀᴇᴀᴅʏ *ᴅɪꜱᴀʙʟᴇᴅ*";
                    reaction = "ℹ️";
                } else {
                    config.ANTI_CALL = false;
                    statusText = "ᴀɴᴛɪ-ᴄᴀʟʟ ʜᴀꜱ ʙᴇᴇɴ *ᴅɪꜱᴀʙʟᴇᴅ*! ❌";
                    additionalInfo = "ᴄᴀʟʟꜱ ᴀʀᴇ ᴀʟʟᴏᴡᴇᴅ";
                    reaction = "❌";
                }
                break;
                
            default:
                statusText = `ᴀɴᴛɪ-ᴄᴀʟʟ ꜱᴛᴀᴛᴜꜱ: ${config.ANTI_CALL ? "✅ *ᴇɴᴀʙʟᴇᴅ*" : "❌ *ᴅɪꜱᴀʙʟᴇᴅ*"}`;
                additionalInfo = config.ANTI_CALL ? "Calls are being blocked" : "Calls are allowed";
                break;
        }

        // Random local image
        const srcDir = path.join(__dirname, "../src");
        const images = fs.readdirSync(srcDir).filter(f => f.match(/\.(jpg|jpeg|png|webp)$/i));
        const selectedImage = images.length > 0 
            ? path.join(srcDir, images[Math.floor(Math.random() * images.length)]) 
            : null;

        // Send with verified contact + forwarded channel context
        await client.sendMessage(from, {
            image: selectedImage ? fs.readFileSync(selectedImage) : null,
            caption: `${statusText}\n\n${additionalInfo}\n\n_ᴊꜰx ᴍᴅ-xᴠ3_`,
            contextInfo: { ...channelContext, mentionedJid: [sender] }
        }, { quoted: verifiedContact });

        // React back
        await client.sendMessage(from, { react: { text: reaction, key: message.key } });

    } catch (error) {
        console.error("Anti-call command error:", error);
        await client.sendMessage(from, {
            text: `⚠️ Error: ${error.message}`,
            mentions: [sender]
        }, { quoted: message });
    }
});
