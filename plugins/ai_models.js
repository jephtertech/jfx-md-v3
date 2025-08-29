const fs = require("fs");
const path = require("path");
const { cmd } = require("../command");
const axios = require("axios");

function getRandomFile(dir, exts) {
    const files = fs.readdirSync(dir).filter(f => exts.some(ext => f.toLowerCase().endsWith(ext)));
    if (!files.length) return null;
    return path.join(dir, files[Math.floor(Math.random() * files.length)]);
}

// =============== OPENAI COMMAND ===============
cmd({
    pattern: "openai",
    alias: ["chatgpt", "gpt3", "open-gpt","gpt5"],
    desc: "Chat with OpenAI",
    category: "ai",
    react: "🧠",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for OpenAI.\nExample: `.openai Hello`");

        const apiUrl = `https://vapis.my.id/api/openai?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.result) {
            await react("❌");
            return reply("OpenAI failed to respond. Please try again later.");
        }

        const status = `🧠 *OpenAI Response:*\n\n${data.result}`;

        const imgPath = getRandomFile("./src", [".jpg", ".png", ".webp"]);
        
        await conn.sendMessage(from, { 
            image: imgPath ? { url: imgPath } : undefined,
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 111
                }
            }
        }, { quoted: mek });

        await react("✅");
    } catch (e) {
        console.error("Error in OpenAI command:", e);
        await react("❌");
        reply("An error occurred while communicating with OpenAI.");
    }
});

// =============== AI COMMAND ===============
cmd({
    pattern: "ai",
    alias: ["bot", "xd", "gpt", "gpt4", "bing"],
    desc: "Chat with an AI model",
    category: "ai",
    react: "🤖",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for the AI.\nExample: `.ai Hello`");

        const apiUrl = `https://lance-frank-asta.onrender.com/api/gpt?q=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.message) {
            await react("❌");
            return reply("AI failed to respond. Please try again later.");
        }

        const status = `*ᴊꜰx ᴍᴅ-xᴠ3 Response:*\n\n${data.message}`;

        const imgPath = getRandomFile("./src", [".jpg", ".png", ".webp"]);
        const audioPath = getRandomFile("./audio", [".mp3", ".mp4"]);

        await conn.sendMessage(from, { 
            image: imgPath ? { url: imgPath } : undefined,
            caption: status,
            ...(audioPath ? { audio: { url: audioPath }, mimetype: "audio/mp4", ptt: true } : {}),
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 222
                }
            }
        }, { quoted: mek });

        await react("✅");
    } catch (e) {
        console.error("Error in AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with the AI.");
    }
});

// =============== DEEPSEEK COMMAND ===============
cmd({
    pattern: "deepseek",
    alias: ["deep", "seekai"],
    desc: "Chat with DeepSeek AI",
    category: "ai",
    react: "👾",
    filename: __filename
},
async (conn, mek, m, { from, q, reply, react }) => {
    try {
        if (!q) return reply("Please provide a message for DeepSeek AI.\nExample: `.deepseek Hello`");

        const apiUrl = `https://api.ryzendesu.vip/api/ai/deepseek?text=${encodeURIComponent(q)}`;
        const { data } = await axios.get(apiUrl);

        if (!data || !data.answer) {
            await react("❌");
            return reply("DeepSeek AI failed to respond. Please try again later.");
        }

        const status = `👾 *DeepSeek AI Response:*\n\n${data.answer}`;
        const imgPath = getRandomFile("./src", [".jpg", ".png", ".webp"]);

        await conn.sendMessage(from, { 
            image: imgPath ? { url: imgPath } : undefined,
            caption: status,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 333
                }
            }
        }, { quoted: mek });

        await react("✅");
    } catch (e) {
        console.error("Error in DeepSeek AI command:", e);
        await react("❌");
        reply("An error occurred while communicating with DeepSeek AI.");
    }
});
