const Discord = require("discord.js")
module.exports = {
    config: {
        name: "ping",
        description: "PONG! Displays the api & bot latency",
        usage: "^2ping",
        category: "other",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embedColor = '#87CEEB'; // color: skyblue


        message.channel.send("Pinging...").then(msg => {
            let ping = msg.createdTimestamp - message.createdTimestamp
            let embed = new Discord.MessageEmbed() //For discord v11 Change to new Discord.RichEmbed()
                .setColor(embedColor)
                .setTitle(`ping`)
                .setDescription(`Bot Latency: \`${ping}\`, API Latency: \`${Math.round(bot.ws.ping)}\``)
            msg.edit(embed)
        });
    }
}

