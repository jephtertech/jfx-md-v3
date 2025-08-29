const axios = require('axios'); 
const config = require('../config');
const { cmd, commands } = require('../command');
const fetch = require('node-fetch'); 
const fs = require('fs');

cmd({
    pattern: "praytime", 
    alias: ["prayertimes", "prayertime", "ptime" ], 
    react: "✅", 
    desc: "Get the prayer times, weather, and location for the city.", 
    category: "information", 
    filename: __filename,
},
async(conn, mek, m, {from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, isItzcp, groupAdmins, isBotAdmins, isAdmins, reply}) => {
    try {
        const city = args.length > 0 ? args.join(" ") : "bhakkar"; // Default to Bhakkar if no city is provided
        const apiUrl = `https://api.nexoracle.com/islamic/prayer-times?city=${city}`;

        const response = await fetch(apiUrl);

        if (!response.ok) {
            return reply('Error fetching prayer times!');
        }

        const data = await response.json();

        if (data.status !== 200) {
            return reply('Failed to get prayer times. Please try again later.');
        }

        const prayerTimes = data.result.items[0];
        const weather = data.result.today_weather; // Weather data
        const location = data.result.city; // Location name

        // Building the message content
        let dec = `*Prayer Times for ${location}, ${data.result.state}*\n\n`;
        dec += `📍 *Location*: ${location}, ${data.result.state}, ${data.result.country}\n`;
        dec += `🕌 *Method*: ${data.result.prayer_method_name}\n\n`;

        dec += `🌅 *Fajr*: ${prayerTimes.fajr}\n`;
        dec += `🌄 *Shurooq*: ${prayerTimes.shurooq}\n`;
        dec += `☀️ *Dhuhr*: ${prayerTimes.dhuhr}\n`;
        dec += `🌇 *Asr*: ${prayerTimes.asr}\n`;
        dec += `🌆 *Maghrib*: ${prayerTimes.maghrib}\n`;
        dec += `🌃 *Isha*: ${prayerTimes.isha}\n\n`;

        dec += `🧭 *Qibla Direction*: ${data.result.qibla_direction}°\n`;

        const temperature = weather.temperature !== null ? `${weather.temperature}°C` : 'Data not available';
        dec += `🌡️ *Temperature*: ${temperature}\n`;

        // Get random image from src folder
        const imageFiles = fs.readdirSync("./src").filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file));
        if (imageFiles.length === 0) throw new Error("No image files found in src folder");
        const randomImage = imageFiles[Math.floor(Math.random() * imageFiles.length)];

        // Sending the image with the caption and context info
        await conn.sendMessage(
            from,
            {
                image: fs.readFileSync(`./src/${randomImage}`),
                caption: dec,
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
            },
            { quoted: mek }
        );

        // Get random audio from audio folder
        const audioFiles = fs.readdirSync("./audio").filter(file => /\.(mp3|mp4|ogg|wav)$/i.test(file));
        if (audioFiles.length === 0) throw new Error("No audio files found in audio folder");
        const randomAudio = audioFiles[Math.floor(Math.random() * audioFiles.length)];

        // Optionally, send an audio file related to the prayer time
        await conn.sendMessage(from, {
            audio: fs.readFileSync(`./audio/${randomAudio}`),
            mimetype: 'audio/mp4',
            ptt: false
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply('*Error occurred while fetching prayer times and weather.*');
    }
});