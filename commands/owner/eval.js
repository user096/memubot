const { ownerid, prefix } = require("../../botconfig.json");
const { inspect } = require("util")

module.exports = { 
    config: {
        name: "eval",
        description: "Evaluates code",
        usage: "F#eval <code>",
        category: "owner",
        accessableby: "owner",
        aliases: ["evl"]
    },
    run: async (bot, message, args) => {
    if(message.author.id == ownerid) {
        try {
            let toEval = args.join(" ")
			let evaluated = inspect(eval(toEval, { depth: 0 }));
            
            if (!toEval) {
                return message.channel.send(`Error while evaluating: \`air\``);
            } else {
                let hrStart = process.hrtime()
                let hrDiff;
                hrDiff = process.hrtime(hrStart);
                return message.channel.send(`*Executed in ${hrDiff[0] > 0 ? `${hrDiff[0]}s ` : ''}${hrDiff[1] / 1000000}ms.*\n\`\`\`javascript\n${evaluated}\n\`\`\``, { maxLength: 1900 })
            }
            
        } catch (e) {
            return message.channel.send(`Error while evaluating: \`${e.message}\``);
        }

      } else {
        return message.reply("⛔access denied⛔ (allowed user/roles: dchu096#3732").then(msg => msg.delete(10000))
      }
    }
}