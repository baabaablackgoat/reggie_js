const music_add = require("./../modules/music_add.js");

const main = function(bot,globals,msg,args){
    if (!args[1]){
        msg.channel.send(`:wheelchair: You need to specify what you want me to play, ${msg.member.displayName}!`);
    } else if (!msg.member.voiceChannel){//user not connected to any channel / couldn't be determined
        msg.channel.send(`:wheelchair: It appears you're not connected to any voice channel, ${msg.member.displayName}.`);
    } else {
        music_add(msg,globals,args[1],1);
    }
};

module.exports = {
    "aliases":['play'],
    "auth":false,
    "help": {
        "short":"Play something in your voice channel.",
        "long":"Allows you to add something to the music queue. Currently supports YouTube links and local files.",
        "args": [{"name":"source","required":true,"usage":"To be played YouTube link or local file."}]
    },
    "fn": main
};