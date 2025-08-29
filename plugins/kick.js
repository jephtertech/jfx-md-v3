const { cmd } = require('../command');
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
    pattern: "remove",
    alias: ["kick", "k", "out"],
    desc: "Removes a member from the group",
    category: "admin",
    react: "❌",
    filename: __filename
},
async (conn, mek, m, {
    from, args, isGroup, isBotAdmin, reply, quoted, sender, groupMetadata
}) => {
    // Check if the command is used in a group
    if (!isGroup) return await reply("❌ This command can only be used in groups.");

    // Get group metadata
    const metadata = await conn.groupMetadata(from).catch(() => null);
    if (!metadata) return await reply("❌ Failed to fetch group info.");

    // Check if sender is admin
    const participant = metadata.participants.find(p => p.id === sender);
    if (!participant || !participant.admin) {
        return await reply("❌ Only group admins can use this command.");
    }

    // Check if bot is admin
    if (!isBotAdmin) {
        return await reply("❌ I need to be an admin to remove members.");
    }

    let userJid;
    if (m.message?.extendedTextMessage?.contextInfo?.mentionedJid?.length > 0) {
        // If user is mentioned
        userJid = m.message.extendedTextMessage.contextInfo.mentionedJid[0];
    } else if (quoted?.sender) {
        // If replying to a message
        userJid = quoted.sender;
    } else if (args.length > 0 && /^\d+$/.test(args[0])) {
        // If phone number is provided
        userJid = args[0] + '@s.whatsapp.net';
    } else {
        return await reply("❌ Please reply to a message, mention a user, or provide a phone number.");
    }

    // Validate the JID
    if (!userJid.includes('@s.whatsapp.net')) {
        userJid = userJid.replace('@', '') + '@s.whatsapp.net';
    }

    try {
        // Remove the participant
        await conn.groupParticipantsUpdate(from, [userJid], 'remove');
        
        // Get the user's number without @s.whatsapp.net
        const userNumber = userJid.split('@')[0];
        
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
            mentionedJid: [userJid],
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

        // Send success message with mention
        await conn.sendMessage(from, {
            image: imageContent,
            caption: `★ ᴍᴏᴛʜᴇʀꜰᴜᴄᴋᴇʀ ᴋɪᴄᴋᴇᴅ @${userNumber}\n\n- Action by admin`,
            contextInfo: channelContext
        }, { quoted: verifiedContact });
        
    } catch (error) {
        console.error("Remove command error:", error);
        await reply(`❌ Failed to remove the member.\n\nError: ${error?.message || error}`);
    }
});