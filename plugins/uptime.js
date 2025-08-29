const { cmd } = require('../command');
const moment = require('moment-timezone');
const fs = require('fs');
const path = require('path');

// 🔹 Helper: pick random image from src folder
function getRandomImageBuffer() {
  const imageDir = path.join(__dirname, "..", "src"); // adjust if needed
  const files = fs.readdirSync(imageDir).filter(file =>
    /\.(jpg|jpeg|png|gif)$/i.test(file)
  );
  if (files.length === 0) return Buffer.alloc(0);
  const randomFile = files[Math.floor(Math.random() * files.length)];
  return fs.readFileSync(path.join(imageDir, randomFile));
}

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

  // 🔹 Pick random image buffer from src folder for thumbnail
  const randomThumb = getRandomImageBuffer();

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
        thumbnail: randomThumb, // ✅ local random thumbnail
        mediaType: 1,
        renderLargerThumbnail: true,
        showAdAttribution: true,
        sourceUrl: "https://github.com/Jeffreyfx1"
      }
    }
  }, { quoted: fakeContact });
});
