const Discord = require("discord.js");
const { prefix } = require("../../botconfig.json");
const { readdirSync } = require("fs")
const { stripIndents } = require("common-tags")
const { cyan } = require("../../colours.json")

module.exports = {
    config: {
        name: "help2",
        aliases: ["halp", "commandlist", "commands"],
        usage: "(command)",
        category: "info",
        description: "Displays all commands that the bot has.",
        accessableby: "Members"
    },
    run: async (bot, message, args) => {
        const embedColor = '#87ceeb';

        const embed = new Discord.MessageEmbed()
            .setColor(embedColor)
            .setTitle("Memubot commands list")
            .setAuthor(`${message.guild.me.displayName}`, bot.user.displayAvatarURL())
            .setThumbnail(bot.user.displayAvatarURL())

        if(!args[0]) {
            const categories = readdirSync("./commands/")

            embed.setDescription(`Bot prefix is: **${prefix}**`)
            embed.setFooter(` ${message.guild.me.displayName} | Total Commands: ${bot.commands.size}`, bot.user.displayAvatarURL());
            categories.forEach(category => {
                const dir = bot.commands.filter(c => c.config.category === category)
                const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1)
                try {
                    embed.addField(`❯ ${capitalise} [${dir.size}]:`, dir.map(c => `\`${c.config.name}\``).join(" "))
                } catch(e) {
                    console.log(e.message)
                }
            })

            return message.author.send(embed).then(() =>
                message.channel.send("Commands have been send to your DM"))
        } else {
            let command = bot.commands.get(bot.aliases.get(args[0].toLowerCase()) || args[0].toLowerCase())
            if(!command) return message.channel.send(embed.setTitle("Invalid Command.").setDescription(`Do \`${prefix}help\` for the list of the commands.`))
            command = command.config

            embed.setDescription(stripIndents`The bot's prefix is: \`${prefix}\`\n
            **Command:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}
            **Description:** ${command.description || "No Description provided."}
            **Usage:** ${command.usage ? `\`${prefix}${command.name} ${command.usage}\`` : "No Usage"}
            **Accessible by:** ${command.accessableby || "Members"}
            **Aliases:** ${command.aliases ? command.aliases.join(", ") : "None."}`)

            return message.channel.send(embed)
        }
    }
}
