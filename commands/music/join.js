const Commando = require('discord.js-commando');
const Discord = require('discord.js');

module.exports = class joinCommand extends Commando.Command {
    constructor(client) {
        super(client, {
            name: 'join',
            group: 'music',
            memberName: 'join',
            description: 'Join the current VC!',
            clientPermissions: [
                'VIEW_CHANNEL'
            ],
            userPermissions: [
                'VIEW_CHANNEL'
            ],



            guildOnly: true,

        });
    }


    async run(message) {
        
		 const embedColor = '#87CEEB'; // color: skyblue
        
         const notinvcEmbed = new Discord.MessageEmbed()
	.setColor(embedColor)
	.setDescription(`${message.client.emotes.error} You are not in a VC!`)
        if (!message.member.voice.channel) return message.channel.send(notinvcEmbed);
        
         const joinedEmbed = new Discord.MessageEmbed()
	.setColor(embedColor)
	.setDescription(`${message.client.emotes.success} Entered VC ${message.member.voice.channel.name}.`)

        if (!message.guild.me.voice.channel) {
            message.member.voice.channel.join().then(message.channel.send(joinedEmbed))
        }

        if (message.member.voice.channel !== message.guild.me.voice.channel) return
    }
};