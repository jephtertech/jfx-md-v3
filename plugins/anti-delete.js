const { cmd } = require('../command');
const { getAnti, setAnti } = require('../data/antidel');

cmd({
    pattern: "antidelete",
    alias: ['antidel', 'del'],
    desc: "Toggle anti-delete feature",
    category: "misc",
    filename: __filename
},
async (conn, mek, m, { from, reply, text, isCreator, sender }) => {
    if (!isCreator) return reply(' This command is only for the bot owner');
    
    // Newsletter configuration
    const newsletterConfig = {
        contextInfo: {
            mentionedJid: [sender],
            forwardingScore: 999,
            isForwarded: true,
            forwardedNewsletterMessageInfo: {
                newsletterJid: '120363420646690174@newsletter',
                newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                serverMessageId: 143
            }
        }
    };

    try {
        const currentStatus = await getAnti();
        
        if (!text || text.toLowerCase() === 'status') {
            return await conn.sendMessage(from, {
                text: `🔒 *AntiDelete Status*\n\nCurrent Status: ${currentStatus ? '✅ ON' : '❌ OFF'}\n\n*Usage:*\n• .antidelete on - Enable protection\n• .antidelete off - Disable protection\n\nby ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ`,
                ...newsletterConfig
            }, { quoted: mek });
        }
        
        const action = text.toLowerCase().trim();
        
        if (action === 'on') {
            await setAnti(true);
            return await conn.sendMessage(from, {
                text: ' *ᴀɴᴛɪ-ᴅᴇʟᴇᴛᴇ ᴇɴᴀʙʟᴇᴅ* \n\nᴍᴇꜱꜱᴀɢᴇ ᴅᴇʟᴇᴛɪᴏɴ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ɪꜱ ɴᴏᴡ ᴀᴄᴛɪᴠᴇ!',
                ...newsletterConfig
            }, { quoted: mek });
        } 
        else if (action === 'off') {
            await setAnti(false);
            return await conn.sendMessage(from, {
                text: '*ᴀɴᴛɪ-ᴅᴇʟᴇᴛᴇ ᴅɪꜱᴀʙʟᴇᴅ* \n\nᴍᴇꜱꜱᴀɢᴇ ᴅᴇʟᴇᴛɪᴏɴ ᴘʀᴏᴛᴇᴄᴛɪᴏɴ ʜᴀs ʙᴇᴇɴ ᴛᴜʀɴᴇᴅ ᴏꜰꜰ.',
                ...newsletterConfig
            }, { quoted: mek });
        } 
        else {
            return await conn.sendMessage(from, {
                text: '⚠️ *Invalid command*\n\n*Usage:*\n• .antidelete on - Enable protection\n• .antidelete off - Disable protection\n• .antidelete status - Check current status',
                ...newsletterConfig
            }, { quoted: mek });
        }
    } catch (e) {
        console.error("Error in antidelete command:", e);
        return await conn.sendMessage(from, {
            text: '*Error occurred*\n\nFailed to process your request. Please try again later.',
            ...newsletterConfig
        }, { quoted: mek });
    }
});
