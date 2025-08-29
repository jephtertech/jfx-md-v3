const { cmd } = require('../command');
const fs = require('fs').promises;
const path = require('path');

// Function to get random image from src folder
async function getRandomImage() {
    try {
        const srcFolder = path.join(__dirname, 'src');
        const files = await fs.readdir(srcFolder);
        const imageFiles = files.filter(file => 
            file.endsWith('.jpg') || 
            file.endsWith('.png') || 
            file.endsWith('.jpeg')
        );
        
        if (imageFiles.length === 0) {
            throw new Error('No images found in src folder');
        }
        
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        return path.join(srcFolder, randomImage);
    } catch (error) {
        console.error('Error getting random image:', error);
        // Fallback image path in case of error
        return path.join(__dirname, 'src', 'default.jpg');
    }
}

cmd({
    pattern: "block",
    desc: "Blocks this chat",
    category: "owner",
    react: "🚫",
    filename: __filename
},
async (conn, m, { reply, react }) => {
    // Get the bot owner's number dynamically
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";
    
    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_Only the bot owner can use this command._");
    }

    try {
        const chatId = m.chat; // Get current chat ID
        await react("✅");
        
        // Get random image
        const imagePath = await getRandomImage();
        
        // Combine both messages into one send operation
        await conn.sendMessage(m.chat, { 
            text: `_Successfully blocked this chat_`,
            image: { url: `file://${imagePath}` },  
            caption: "*ᴊꜰx ᴍᴅ-xᴠ3 𝐍𝐄𝐖𝐒𝐋𝐄𝐓𝐓𝐄𝐑*\n\nThis chat has been blocked by the owner.",
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
        }, { quoted: m });
        
        // Actually block the chat after sending the message
        await conn.updateBlockStatus(chatId, "block");
    } catch (error) {
        console.error("Block command error:", error);
        await react("❌");
        reply(`_Failed to block this chat._\nError: ${error.message}_`);
    }
});

cmd({
    pattern: "unblock",
    desc: "Unblocks this chat",
    category: "owner",
    react: "🔓",
    filename: __filename
},
async (conn, m, { reply, react }) => {
    const botOwner = conn.user.id.split(":")[0] + "@s.whatsapp.net";

    if (m.sender !== botOwner) {
        await react("❌");
        return reply("_Only the bot owner can use this command._");
    }

    try {
        const chatId = m.chat; // Get current chat ID
        await react("✅");
        
        // Get random image
        const imagePath = await getRandomImage();
        
        // Combine both messages into one send operation
        await conn.sendMessage(m.chat, { 
            text: `_Successfully unblocked this chat_`,
            image: { url: `file://${imagePath}` },  
            caption: "*ᴊꜰx ᴍᴅ-xᴠ3 𝐍𝐄𝐖𝐒𝐋�{E𝐓𝐓𝐄𝐑*\n\nThis chat has been unblocked by the owner.",
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
        }, { quoted: m });
        
        // Actually unblock the chat after sending the message
        await conn.updateBlockStatus(chatId, "unblock");
    } catch (error) {
        console.error("Unblock command error:", error);
        await react("❌");
        reply(`_Failed to unblock this chat._\nError: ${error.message}_`);
    }
});