const { RichEmbed } = require("discord.js")
const { cyan } = require("../../colours.json");

module.exports = {
    config: {
        name: "lenny",
        description: "post the lenny face",
        usage: "^2lenny",
        category: "other",
        accessableby: "Members",
        aliases: ["lny",]
    },
    run: async (bot, message, args) => {
        message.channel.send("( ͡° ͜ʖ ͡°)");

        message.delete();

    }

}