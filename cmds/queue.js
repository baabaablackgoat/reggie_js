const discord = require("discord.js");
module.exports = {
    "aliases":['queue','playlist','upcoming'],
    "auth":false,
    "help": {
        "short":"xd",
        "long":"xd",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        if (globals.queue.length === 0){
            msg.channel.send(`My queue is empty. You can add something with \`play\`!`);
        } else {
            let response = "";
            for (let i in globals.queue){
                response += `${i == 0 ? "🎵" : "#"+i}\t${globals.queue[i].title} | Q'd by ${globals.queue[i].requestor.displayName}\n`;
            }
            msg.channel.send(response);
        }
    }
};