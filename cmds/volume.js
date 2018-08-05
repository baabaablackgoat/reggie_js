module.exports = {
    "aliases":['volume','vol'],
    "auth":["MUTE_MEMBERS"],
    "valid_channel_types": ["text"],
    "help": {
        "short":"Changes the volume of playback.",
        "long":"Will change the volume of the bot playing back sound. Do note that users can still use user configured volume to change the volume themselves. If no input is given, the current volume is displayed.",
        "args": [{"name":"volume","required":false,"usage":"Desired volume (1-100)"}],
    },
    "fn": function(bot,globals,msg,args){
        if (!msg.member.hasPermission("MUTE_MEMBERS")){
            msg.channel.send(`:wheelchair: You don't have permission to change my volume, ${msg.member.displayName}.`);
        } else if (!args[1]){
            msg.channel.send(`:speaker: Current volume is **${globals.volume}**.`);
        } else {
            let target = Math.floor(Number(args[1]));
            if (!target || target > 100 || target < 1) {
                msg.channel.send(`:wheelchair: That is not a valid value, ${msg.member.displayName}. Enter any value between 1 and 100.`);
            } else {
                globals.volume = target;
                let reply = `:speaker: Changing volume to **${target}**.`;
                if (globals.voice.dispatcher) {
                    globals.voice.dispatcher.setVolume(target/100);
                } else {
                    reply += " This will be effective on the next broadcast.";
                }
                msg.channel.send(reply);
            }
        }
    }
};