const Discord = require("discord.js")

module.exports= {
    config: {
        name: "indian",
        description: "Adds the role عربى to yourself!",
        usage: "^2indian",
        category: "selfroles",
        accessableby: "Members",
        aliases: ["ind"]
    },
    run: async (bot, message, args) => {

        message.delete().catch(O_o=>{});

        let rMember = message.member
        if(!rMember) return message.channel.send("An error occured")
        let role = message.guild.roles.find(r => r.id == 726339428800266250)
        if(!role) return message.channel.send("The role is not found on this server")

        if(!message.guild.me.hasPermission(["MANAGE_ROLES", "ADMINISTRATOR"])) return message.channel.send("I don't have permission to perform this command.")

        if(rMember.roles.has(role.id)) {
            await rMember.removeRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`Role ${role.name} removed.`).then(msg => {msg.delete(5000)});
        } else {
            await rMember.addRole(role.id).catch(e => console.log(e.message))
            message.channel.send(`Role ${role.name} added.`).then(msg => {msg.delete(5000)});

        }

    }
}