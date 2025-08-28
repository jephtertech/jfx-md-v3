const config = require('../config')
const {cmd , commands} = require('../command')
cmd({
    pattern: "about",
    alias: ["jephter","whois"], 
    react: "👑",
    desc: "get owner dec",
    category: "main",
    filename: __filename
},
async(conn, mek, m,{from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
let about = `
*╭━〔 ᴊꜰx ᴍᴅ-xᴠ3 〕━┈⊷*
*👋 HELLO _${pushname}_*
*╰────────────┈⊷*

> *╭───〔 𝗔𝗯𝗼𝘂𝘁 𝗠𝗲 〕───╮*
> *┃✨ Creator  : ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
> *┃📝 Real Name: ᴊᴇᴘʜᴛᴇʀ*
> *┃🌐 Alias    : ᴊꜰx ᴍᴅ-xᴠ3*
> *┃🎂 Age      : Secret 😎*
> *┃🏙️ Location : Lagos, Nigeria 🇳🇬*
> *┃💻 Tech     : Node.js + Baileys*
> *┃⚡ Status   : Online & Ready*
> *╰────────────────╯*

*© ᴘᴏᴡᴇʀᴇᴅ ʙʏ ᴊᴇᴘʜᴛᴇʀ ᴛᴇᴄʜ*
*•────────────•⟢*
`

await conn.sendMessage(from,{image:{url:`https://files.catbox.moe/7w1yde.jpg`},caption:about,
                             contextInfo: {
    mentionedJid: [m.sender],
    forwardingScore: 999,
    isForwarded: true,
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363420646690174@newsletter',
      newsletterName: 'ᴊꜰx ᴍᴅ-xᴠ3',
      serverMessageId: 999
    }
  }
}, { quoted: mek });
} catch (e) {
console.log(e)
reply(`${e}`)
}
})
