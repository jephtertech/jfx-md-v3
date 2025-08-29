const os = require("os");
const { performance } = require("perf_hooks");
const { cmd } = require("../command");

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  use: ".ping",
  desc: "Check bot's response time and system status",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from }) => {
  try {
    const start = performance.now();

    // Send a quick response for latency calc
    const sentMsg = await conn.sendMessage(from, { text: "🏓 Pinging..." }, { quoted: m });
    const latency = Math.round(performance.now() - start);

    // System info
    const uptimeSec = process.uptime();
    const uptime = new Date(uptimeSec * 1000).toISOString().substr(11, 8); // HH:MM:SS
    const ramUsed = (process.memoryUsage().rss / 1024 / 1024).toFixed(2);
    const ramTotal = (os.totalmem() / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus()[0].model;
    const cpuCores = os.cpus().length;
    const platform = os.platform();
    const host = os.hostname();

    // Branded status message
    const statusMsg = `
╭─❏ *『 ᴊꜰx ᴍᴅ-x ꜱʏꜱᴛᴇᴍ 』*
│
│ *Ping:* \`${latency} ms\`
│ *Uptime:* \`${uptime}\`
│
│ *RAM:* \`${ramUsed}MB\`
│ *CPU:* \`(${cpuCores} cores)\`
│ *Platform:* \`${platform}\`
│ *Hosting:* \`${host}\`
│ *Node.js:* \`${process.version}\`
│
│ *Status:* Active & Stable
│ *By:* ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ
╰───────────────❏
`.trim();

    // Verified contact style (same as .alive)
    const verifiedContact = {
      key: {
        fromMe: false,
        participant: `0@s.whatsapp.net`,
        remoteJid: "status@broadcast"
      },
      message: {
        contactMessage: {
          displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
          vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ 🧚‍♀️\nORG:Vᴇʀᴏɴɪᴄᴀ BOT;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
        }
      }
    };

    // Send image + branded caption with verified contact
    await conn.sendMessage(from, {
      image: { url: `https://files.catbox.moe/3287mw.jpg` },
      caption: statusMsg,
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
    }, { quoted: verifiedContact });

    // Optional: Send audio response as well (PTT style)
    await conn.sendMessage(from, {
      audio: { url: 'https://files.catbox.moe/eqfc2j.mp3' },
      mimetype: 'audio/mp4',
      ptt: true
    }, { quoted: verifiedContact });

  } catch (e) {
    console.error("Error in ping command:", e);
    await conn.sendMessage(from, { text: `❌ An error occurred: ${e.message}` }, { quoted: m });
  }
});
