const { cmd } = require('../command');
const fs = require("fs");
const path = require("path");

cmd({
    pattern: "online",
    alias: ["whosonline", "onlinemembers"],
    desc: "Check who's online in the group (Admins & Owner only)",
    category: "main",
    react: "🟢",
    filename: __filename
},
async (conn, mek, m, { from, quoted, isGroup, isAdmins, isCreator, fromMe, reply }) => {
    try {
        // Check if the command is used in a group
        if (!isGroup) return reply("❌ This command can only be used in a group!");

        
        

        const onlineMembers = new Set();
        const groupData = await conn.groupMetadata(from);
        
        // Request presence updates for all participants
        const presencePromises = groupData.participants.map(participant => 
            conn.presenceSubscribe(participant.id)
                .then(() => conn.sendPresenceUpdate('composing', participant.id))
                .catch(() => {}) // Silently handle errors for individual participants
        );

        await Promise.all(presencePromises);

        // Presence update handler
        const presenceHandler = (json) => {
            try {
                for (const id in json.presences) {
                    const presence = json.presences[id]?.lastKnownPresence;
                    if (['available', 'composing', 'recording', 'online'].includes(presence)) {
                        onlineMembers.add(id);
                    }
                }
            } catch (e) {
                console.error("Error in presence handler:", e);
            }
        };

        conn.ev.on('presence.update', presenceHandler);

        // Setup cleanup and response
        const checks = 3;
        const checkInterval = 5000;
        let checksDone = 0;

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
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN:ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ 🧚‍♀️\nORG:Vᴇʀᴏɴɪᴄᴀ BOT;\nTEL;type=CELL;type=VOICE;waid=2349046157539:+2349046157539\nEND:VCARD"
                }
            }
        };

        const checkOnline = async () => {
            try {
                checksDone++;
                
                if (checksDone >= checks) {
                    clearInterval(interval);
                    conn.ev.off('presence.update', presenceHandler);
                    
                    if (onlineMembers.size === 0) {
                        return reply("⚠️ Couldn't detect any online members. They might be hiding their presence.");
                    }
                    
                    const onlineArray = Array.from(onlineMembers);
                    const onlineList = onlineArray.map((member, index) => 
                        `${index + 1}. @${member.split('@')[0]}`
                    ).join('\n');
                    
                    // Channel forwarding context (reusable)
                    const channelContext = {
                        mentionedJid: onlineArray,
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
                        caption: ` *ᴏɴʟɪɴᴇ ᴍᴇᴍʙᴇʀꜱ* (${onlineArray.length}/${groupData.participants.length}):\n\n${onlineList}\n\n _ꜰᴀꜱᴛ ᴀꜱꜰ!_ `,
                        contextInfo: channelContext
                    }, { quoted: verifiedContact });

                    // Send random audio (PTT style) with channel context
                    await conn.sendMessage(from, { 
                        audio: fs.readFileSync(randomAudio),
                        mimetype: 'audio/mp4',
                        ptt: true,
                        contextInfo: channelContext
                    }, { quoted: verifiedContact });
                }
            } catch (e) {
                console.error("Error in checkOnline:", e);
                reply(`ᴄᴀʟᴍꜱ ᴇʀʀᴏʀ ᴡʜɪʟᴇ ᴄʜᴇᴄᴋɪɴɢ`);
            }
        };

        const interval = setInterval(checkOnline, checkInterval);

        // Set timeout to clean up if something goes wrong
        setTimeout(() => {
            clearInterval(interval);
            conn.ev.off('presence.update', presenceHandler);
        }, checkInterval * checks + 10000); // Extra 10 seconds buffer

    } catch (e) {
        console.error("Error in online command:", e);
        reply(`❌ An error occurred: ${e.message}`);
    }
});