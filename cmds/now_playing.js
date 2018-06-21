const discord = require("discord.js");
module.exports = {
    "aliases":['np','nowplaying','whatsthissong','whatsplaying'],
    "auth":false,
    "help": {
        "short":"xd",
        "long":"xd",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        let element = globals.queue[0];
        if (!element){
            msg.channel.send(`I'm not playing anything right now. You can add something with \`play\`!`);
        } else {
            let embed = new discord.RichEmbed({
                "title": element.title,
                "author": {"name": `Queued by ${element.requestor.displayName}`, "icon_url": element.requestor.user.avatarURL}
            });
            if (element.location=="youtube") {
                embed.setURL(`https://youtu.be/${element.source}`);
            }
            msg.channel.send(embed);
        }
    }
};