const fetch = require('node-fetch');

async function lyricsCommand(sock, chatId, songTitle, message) {
    if (!songTitle) {
        await sock.sendMessage(chatId, { 
            text: 'ᴘʟᴇᴀꜱᴇ ᴇɴᴛᴇʀ ᴛʜᴇ ꜱᴏɴɢ ɴᴀᴍᴇ ᴛᴏ ɢᴇᴛ ᴛʜᴇ ʟʏʀɪᴄꜱ! ᴜꜱᴀɢᴇ: ʟʏʀɪᴄꜱ <ꜱᴏɴɢ ɴᴀᴍᴇ>*'
        },{ quoted: message });
        return;
    }

    try {
        // Use lyricsapi.fly.dev and return only the raw lyrics text
        const apiUrl = `https://lyricsapi.fly.dev/api/lyrics?q=${encodeURIComponent(songTitle)}`;
        const res = await fetch(apiUrl);
        
        if (!res.ok) {
            const errText = await res.text();
            throw errText;
        }
        
        const data = await res.json();

        const lyrics = data && data.result && data.result.lyrics ? data.result.lyrics : null;
        if (!lyrics) {
            await sock.sendMessage(chatId, {
                text: `ꜱᴏʀʀʏ, ɪ ᴄᴏᴜʟᴅɴ'ᴛ ꜰɪɴᴅ ᴀɴʏ ʟʏʀɪᴄꜱ ꜰᴏʀ "${songTitle}".`
            },{ quoted: message });
            return;
        }

        const maxChars = 4096;
        const output = lyrics.length > maxChars ? lyrics.slice(0, maxChars - 3) + '...' : lyrics;

        await sock.sendMessage(chatId, { text: output }, { quoted: message });
    } catch (error) {
        console.error('Error in lyrics command:', error);
        await sock.sendMessage(chatId, { 
            text: `ᴀɴ ᴇʀʀᴏʀ ᴏᴄᴄᴜʀʀᴇᴅ ᴡʜɪʟᴇ ꜰᴇᴛᴄʜɪɴɢ ᴛʜᴇ ʟʏʀɪᴄꜱ ꜰᴏʀ "${songTitle}".`
        },{ quoted: message });
    }
}

module.exports = { lyricsCommand };
