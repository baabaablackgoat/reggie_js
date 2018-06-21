const main = function(bot,globals,msg,args){
    if (msg.member.permissions.has("ADMINISTRATOR")){
        msg.channel.send(`:raised_hand: ${msg.member.displayName} has forcefully skipped the current song.`);
        globals.voice.dispatcher.end(`Forceskip by ${msg.member.displayName}`);
    } else {
        let req_votes = Math.ceil(globals.voice.connection.channel.members.size - 1)/2; //the bot is a member too, you know! (that's what she said.)
        if (!globals.votes.music_skip.includes(msg.author.id)){ //DIDN'T vote yet.
            globals.votes.music_skip.push(msg.author.id);
        }
        msg.channel.send(`:pencil: Your vote to skip has been acknowledged, ${msg.member.displayName}. **${globals.votes.music_skip.length}/${req_votes}**`);
        if (globals.votes.music_skip.length >= req_votes){
            msg.channel.send(`:raised_hand: The current song has been voteskipped.`);
            globals.voice.dispatcher.end("Voteskip");
        }
    }
};

module.exports = {
    "aliases":['skip','ohgodnotthissongplease'],
    "auth":false,
    "help": {
        "short":"foobar",
        "long":"foobar",
        "args": false
    },
    "fn": main
};