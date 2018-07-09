const main = function(bot,globals,msg,args){
    if (["force","admin","now"].includes(args[1]) && msg.member.permissions.has("ADMINISTRATOR")){
        msg.channel.send(`:raised_hand: ${msg.member.displayName} has forcefully skipped the current song.`);
        globals.voice.dispatcher.end(`Forceskip by ${msg.member.displayName}`);
    } else if (globals.voice.connection.channel.id === msg.member.voiceChannelID){
        let req_votes = Math.ceil((globals.voice.connection.channel.members.size - 1)/2); //the bot is a member too, you know! (that's what she said.)
        if (!globals.votes.music_skip.includes(msg.author.id)){ //DIDN'T vote yet.
            globals.votes.music_skip.push(msg.author.id);
        }
        msg.channel.send(`:pencil: Your vote to skip has been acknowledged, ${msg.member.displayName}. **${globals.votes.music_skip.length}/${req_votes}**`);
        if (globals.votes.music_skip.length >= req_votes){
            msg.channel.send(`:raised_hand: The current song has been voteskipped.`);
            globals.voice.dispatcher.end("Voteskip");
        }
    } else {
        msg.channel.send(`:wheelchair: You're not in the voice channel, ${msg.member.displayName}! You can't vote on skipping.`);
    }
};

module.exports = {
    "aliases":['skip','ohgodnotthissongplease'],
    "auth":false,
    "valid_channel_types": ["text"],
    "help": {
        "short":"Skip the current song.",
        "long":"Will add a vote to skip the song. If enough votes are reached (>=50% of listeners), the song is skipped. Only admins can force a skip.",
        "args": [{"name":"force","required":false,"usage":"'force/admin/now' will skip the song immediately."}]
    },
    "fn": main
};