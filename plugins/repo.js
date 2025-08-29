const fs = require("fs");
const path = require("path");
const fetch = require("node-fetch");
const { cmd } = require("../command");

const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

cmd({
    pattern: "script",
    alias: ["repo", "sc", "info"],
    desc: "Fetch information about the GitHub repository.",
    react: "🎗️",
    category: "info",
    filename: __filename,
}, async (m, sock, msg, { from }) => {
    m.reply = async (text, options = {}) => {
        return m.sendMessage(from, { text, mentions: [msg.sender], ...options });
    };

    const githubRepoURL = "https://github.com/Jeffreyfx1/jfx-md-x-v3";
    const pairsiteURL = "https://jfx-v3-session.onrender.com";

    try {
        // 🎲 Spin through ./src for random image
        const srcDir = path.join(__dirname, "../src");
        const imageFiles = fs.readdirSync(srcDir).filter(f => /\.(jpe?g|png|webp)$/i.test(f));
        if (imageFiles.length === 0) throw new Error("No images found in ./src");
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];
        const selectedImage = fs.readFileSync(path.join(srcDir, randomImage));

        // 🎶 Spin through ./audio for random audio
        const audioDir = path.join(__dirname, "../audio");
        const audioFiles = fs.readdirSync(audioDir).filter(f => /\.(mp3|mp4)$/i.test(f));
        if (audioFiles.length === 0) throw new Error("No audio found in ./audio");
        const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];
        const selectedAudio = fs.readFileSync(path.join(audioDir, randomAudio));

        // 🔗 Fetch repo details from GitHub
        const [, username, repoName] =
            githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/) || [];
        if (!username || !repoName) throw new Error("Invalid GitHub URL format");

        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        if (!response.ok) throw new Error(`GitHub API request failed: ${response.status}`);
        const repoData = await response.json();

        // 📝 Info text
        const formattedInfo = `
*𝐇𝐄𝐋𝐋𝐎 DEAR!* 
──────────────────
📂 *Repository Link:*  
> ${githubRepoURL}

*★ᴘᴀɪʀ ꜱɪᴛᴇ*
> ${pairsiteURL}

${readMore}
\`BOT NAME:\`
> ${repoData.name}

\`OWNER NAME:\`
> ${repoData.owner.login}

\`STARS:\`
> ${repoData.stargazers_count}

\`FORKS:\`
> ${repoData.forks_count}
──────────────────
\n> *© ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ* 🎐`;

        // 📞 Verified contact
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "ᴊꜰx ᴍᴅ-xᴠ3",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };

        // 🖼️ Send random local image with caption (forwarded + verified contact)
        await m.sendMessage(from, {
            image: selectedImage,
            caption: formattedInfo,
            contextInfo: {
                mentionedJid: [msg.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 143
                }
            }
        }, { quoted: verifiedContact });

        // 🔊 Send random local audio (forwarded + verified contact)
        await m.sendMessage(from, {
            audio: selectedAudio,
            mimetype: "audio/mp4",
            ptt: true,
            contextInfo: {
                mentionedJid: [msg.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363420646690174@newsletter',
                    newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
                    serverMessageId: 144 // unique from image
                }
            }
        }, { quoted: verifiedContact });

    } catch (error) {
        console.error("Error in script command:", error);
        await m.reply("❌ Error: " + error.message);
    }
});
