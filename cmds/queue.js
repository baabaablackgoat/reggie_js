const discord = require("discord.js");
module.exports = {
    "aliases":['queue','playlist','upcoming'],
    "auth":false,
    "valid_channel_types": ["text"],
    "help": {
        "short":"Show the music queue.",
        "long":"Allows you to add something to the music queue. Currently supports YouTube links and local files.",
        "args": false,
    },
    "fn": function(bot,globals,msg,args){
        if (globals.queue.length === 0){
            msg.channel.send(`My queue is empty. You can add something with \`play\`!`);
        } else {
            let response = "";
            for (let i = 0; i < globals.queue.length && i <= 10; i++){
                if (i === 10) { //prevent too long queues to avoid message splitting
                    response += `**...and ${globals.queue.length-10} more**`;
                } else {
                    response += `${i === 0 ? "\`🎵\`" : "\`#"+i+"\`"}\t**${globals.queue[i].title}** | Q'd by ${globals.queue[i].requestor.displayName}\n`;
                }
            }
            msg.channel.send(response);
        }
    }
};