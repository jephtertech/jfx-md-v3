const fs = require("fs");
const path = require("path");
const { isJidGroup } = require('@whiskeysockets/baileys');
const { loadMessage, getAnti } = require('../data');
const config = require('../config');

// Newsletter configuration
const NEWSLETTER_CONFIG = {
    jid: '120363420646690174@newsletter',
    name: 'ᴊꜰx ᴀɴᴛɪᴅᴇʟᴇᴛᴇ ꜱᴘɪʀɪᴛ',
    serverMessageId: 143,
    imagePath: path.join(__dirname, "../src/menu2.jpg"),  // 👈 LOCAL IMAGE
    watermark: '> BY ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ'
};

const getNewsletterContext = () => ({
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
        newsletterJid: NEWSLETTER_CONFIG.jid,
        newsletterName: NEWSLETTER_CONFIG.name,
        serverMessageId: NEWSLETTER_CONFIG.serverMessageId
    }
});

const DeletedText = async (conn, mek, jid, deleteInfo, isGroup, update) => {
    try {
        const messageContent = mek.message?.conversation 
            || mek.message?.extendedTextMessage?.text
            || mek.message?.imageMessage?.caption
            || mek.message?.videoMessage?.caption
            || mek.message?.documentMessage?.caption
            || '🚫 Content unavailable (may be media without caption)';
        
        const fullMessage = `
${deleteInfo}

📝 *Message Content:*
${messageContent}

${NEWSLETTER_CONFIG.watermark}`;

        const mentionedJids = isGroup 
            ? [update.key.participant, mek.key.participant].filter(Boolean) 
            : [update.key.remoteJid].filter(Boolean);

        await conn.sendMessage(
            jid,
            {
                image: fs.readFileSync(NEWSLETTER_CONFIG.imagePath), // 👈 LOCAL IMAGE
                caption: fullMessage,
                contextInfo: {
                    ...getNewsletterContext(),
                    mentionedJid: mentionedJids,
                },
            },
            { quoted: mek }
        );
    } catch (error) {
        console.error('Error in DeletedText:', error);
    }
};

const DeletedMedia = async (conn, mek, jid, deleteInfo) => {
    try {
        const antideletedmek = structuredClone(mek.message);
        const messageType = Object.keys(antideletedmek)[0];
        
        const mediaTypes = {
            imageMessage: { type: 'image', key: 'imageMessage' },
            videoMessage: { type: 'video', key: 'videoMessage' },
            audioMessage: { type: 'audio', key: 'audioMessage' },
            documentMessage: { type: 'document', key: 'documentMessage' },
            stickerMessage: { type: 'sticker', key: 'stickerMessage' }
        };

        const currentType = mediaTypes[messageType];
        
        if (currentType) {
            const caption = `
${deleteInfo}

${NEWSLETTER_CONFIG.watermark}`;

            if (['image', 'video'].includes(currentType.type)) {
                const mediaUrl = antideletedmek[currentType.key]?.url;
                
                await conn.sendMessage(jid, { 
                    [currentType.type]: mediaUrl ? { url: mediaUrl } : fs.readFileSync(NEWSLETTER_CONFIG.imagePath), // 👈 Fallback to local image
                    caption: caption,
                    contextInfo: {
                        ...getNewsletterContext(),
                        mentionedJid: [mek.sender],
                    }
                }, { quoted: mek });
            } else {
                await conn.sendMessage(jid, { 
                    image: fs.readFileSync(NEWSLETTER_CONFIG.imagePath), // 👈 LOCAL IMAGE
                    caption: `*⚠️ Deleted ${currentType.type.toUpperCase()} Alert 🚨*`,
                    contextInfo: getNewsletterContext()
                });
                
                await conn.sendMessage(jid, { 
                    text: caption,
                    contextInfo: getNewsletterContext()
                }, { quoted: mek });
                
                if (antideletedmek[currentType.key]?.url) {
                    await conn.sendMessage(jid, {
                        [currentType.type]: { url: antideletedmek[currentType.key].url },
                        contextInfo: getNewsletterContext()
                    }, { quoted: mek });
                }
            }
        } else {
            antideletedmek[messageType].contextInfo = {
                ...getNewsletterContext(),
                stanzaId: mek.key.id,
                participant: mek.sender,
                quotedMessage: mek.message,
            };
            await conn.relayMessage(jid, antideletedmek, {});
        }
    } catch (error) {
        console.error('Error in DeletedMedia:', error);
    }
};
