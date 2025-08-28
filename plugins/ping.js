const config = require('../config');
const { cmd, commands } = require('../command');

cmd({
  pattern: "ping",
  alias: ["speed", "pong"],
  use: '.ping',
  desc: "Check bot's response time",
  category: "main",
  react: "⚡",
  filename: __filename
}, async (conn, mek, m, { from, reply }) => {
  try {
    const start = Date.now();
    
    // Send a message and capture the response timestamp
    await reply(" ping...");
    const end = Date.now();
    const latencyMs = end - start;

    let reactionEmoji = '⚡';
    if (latencyMs > 1000) {
      reactionEmoji = '🐢';
    } else if (latencyMs > 500) {
      reactionEmoji = '🔄';
    }

    await reply(`> *ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ: ${latencyMs}ms ${reactionEmoji}*`);
  } catch (e) {
    console.error("Error in ping command:", e);
    reply(`An error occurred: ${e.message}`);
  }
});
