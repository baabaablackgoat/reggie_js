const discord = require("discord.js");
module.exports = {
    "aliases":['np','nowplaying','whatsthissong','whatsplaying'],
    "auth":false,
    "valid_channel_types": ["text"],
    "help": {
        "short":"What's playing?",
        "long":"Will respond with information about the song currently being played by the bot.",
        "args": false,
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
            if (typeof element.duration === "number") {
                let streamtime = Math.floor(globals.voice.dispatcher.totalStreamTime / 1000);
                //there's probably a more elegant solution to this.
                let stream_secs = String(streamtime%60); 
                if (stream_secs.length < 2) { stream_secs = "0" + stream_secs;} 
                let duration_secs = String(element.duration%60);
                if (duration_secs.length < 2) {duration_secs = "0"+ duration_secs;}
                let progress = (streamtime / element.duration).toFixed(1);
                embed.addField("Duration",`${Math.floor(streamtime/60)}:${stream_secs} [${progress*10 !== 0 ? "—".repeat(progress*10) : ""}🔘${10-(progress*10) !== 0 ? "—".repeat(10-(progress*10)) : ""}] ${Math.floor(element.duration/60)}:${duration_secs}`);
            }
            msg.channel.send(embed);
        }
    }
};