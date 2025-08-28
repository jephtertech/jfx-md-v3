const { cmd } = require('../command');
const moment = require('moment-timezone');

cmd({
  pattern: "uptime",
  alias: ["up"],
  desc: "Check how long the bot has been online.",
  category: "system",
  filename: __filename,
}, async (Void, m, text) => {
  const runtime = () => {
    let seconds = process.uptime();
    let hours = Math.floor(seconds / 3600);
    let minutes = Math.floor((seconds % 3600) / 60);
    let secs = Math.floor(seconds % 60);
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const fakeContact = {
    key: {
      fromMe: false,
      participant: "0@s.whatsapp.net",
      remoteJid: "status@broadcast"
    },
    message: {
      contactMessage: {
        displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
        vcard: `BEGIN:VCARD\nVERSION:3.0\nFN:ᴊꜰx ᴍᴅ-xᴠ3\nORG:ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ;\nTEL;type=CELL;type=VOICE;waid=254700000000:+2349046157539\nEND:VCARD`,
        jpegThumbnail: Buffer.alloc(0)
      }
    }
  };

  const uptimeText = `*ᴊꜰx ᴍᴅ-xᴠ3 Uptime:*\n🕒 ${runtime()}\n ʙᴏᴛ ɪꜱ ᴀᴄᴛɪᴠᴇ ᴛʜᴀɴ ʏᴏᴜʀ ɢꜰ!.`;

  await Void.sendMessage(m.chat, {
    text: uptimeText,
    contextInfo: {
      forwardingScore: 999,
      isForwarded: true,
      forwardedNewsletterMessageInfo: {
        newsletterJid: "120363420646690174@newsletter",
        newsletterName: "ᴊꜰx ᴍᴅ-xᴠ3"
      },
      externalAdReply: {
        title: "ᴊꜰx ᴍᴅ-xᴠ3",
        body: "Uptime Monitor by ᴊꜰx ᴍᴅ-xᴠ3",
        thumbnailUrl: "https://files.catbox.moe/j5jjt6.jpg",
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/Jeffreyfx1"
      }
    }
  }, { quoted: fakeContact });
});
