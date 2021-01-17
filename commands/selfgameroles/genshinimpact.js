const Discord = require("discord.js")

module.exports= {
    config: {
        name: "genshinimpact",
        description: "Adds the role Genshin Impact to a yourself!",
        usage: " ",
        category: "selfgameroles",
        accessableby: "Members",
    },
    run: async (bot, message, args) => {
        const warningColor = '#ff0000';

        message.delete().catch(O_o=>{});

        let rMember = message.member

        if(!rMember) return

        const role = message.guild.roles.cache.find(r => r.id ===  '798795772573384724')
        if(!role) {
            let rolenotfoundEmbed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Roles not found on this server")
                .addField("required:", "Role Genshin Impact", false)
                .setColor(warningColor);
            return message.channel.send(rolenotfoundEmbed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if (!message.guild.me.permissions.has("MANGE_ROLES")) {
            let botnopermsembed = new Discord.MessageEmbed()
                .setTitle("❌Error")
                .setDescription("Missing MANAGE_ROLES permission (bot)")
                .addField("required:", "MANAGE_ROLES permission", false)
                .setColor(warningColor);
            return message.channel.send(botnopermsembed).then(msg => msg.delete({timeout: 5000})).catch(O_o => {
            });
        }

        if(rMember.roles.cache.has(role.id)) {
            await rMember.roles.remove(role.id).catch(e => console.log(e.message))
            message.channel.send(`Role ${role.name} removed.`).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});
        } else {
            await rMember.roles.add(role.id).catch(e => console.log(e.message))
            message.channel.send(`Role ${role.name} added.`).then(msg => msg.delete({timeout: 5000})).catch(O_o => {});

        }

    }
}