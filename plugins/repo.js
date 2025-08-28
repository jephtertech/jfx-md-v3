const more = String.fromCharCode(8206);
const readMore = more.repeat(4001);

const fetch = require('node-fetch');
const config = require('../config');    
const { cmd } = require('../command');

cmd({
    pattern: "script",
    alias: ["repo", "sc", "info"],
    desc: "Fetch information about a GitHub repository.",
    react: "🎗️",
    category: "info",
    filename: __filename,
},
async (conn, mek, m, { from, reply }) => {
    const githubRepoURL = 'https://github.com/Jeffreyfx1/jfx-md-x-v3.git';

    try {
        // Extract username and repo name from the URL
        const [, username, repoName] = githubRepoURL.match(/github\.com\/([^/]+)\/([^/]+)/) || [];

        if (!username || !repoName) {
            throw new Error("Invalid GitHub URL format");
        }

        // Fetch repository details using GitHub API
        const response = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
        
        if (!response.ok) {
            throw new Error(`GitHub API request failed with status ${response.status}`);
        }

        const repoData = await response.json();

        // Format the repository information
        const formattedInfo = `
*𝐇𝐄𝐋𝐋𝐎 𝐓𝐇𝐄𝐑𝐄* 
──────────────────
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
\n> *©ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ* 🎐`;

        // Contact message for verified context
        const verifiedContact = {
            key: {
                fromMe: false,
                participant: `0@s.whatsapp.net`,
                remoteJid: "status@broadcast"
            },
            message: {
                contactMessage: {
                    displayName: "VERONICA-AI REPO",
                    vcard: "BEGIN:VCARD\nVERSION:3.0\nFN: ᴊꜰx ᴍᴅ-xᴠ3\nORG:ᴊꜰx ᴍᴅ-xᴠ3;\nTEL;type=CELL;type=VOICE;waid=93775551335:+2349046157539\nEND:VCARD"
                }
            }
        };

        // Send an image with the formatted info as a caption and context info
        await conn.sendMessage(from, {
            image: { url: `https://files.catbox.moe/pvhmgv.jpg` },
            caption: formattedInfo,
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

        // Send the audio file with context info
        await conn.sendMessage(from, {
            audio: { url: 'https://files.catbox.moe/eqfc2j.mp3' },
            mimetype: 'audio/mp4',
            ptt: true,
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

    } catch (error) {
        console.error("Error in repo command:", error);
        reply("Sorry, something went wrong while fetching the repository information. Please try again later.");
    }
});
