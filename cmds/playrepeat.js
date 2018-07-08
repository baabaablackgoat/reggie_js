const music_add = require("./../modules/music_add.js");

const main = function(bot,globals,msg,args){
    if (!args[1]){
        msg.channel.send(`:wheelchair: You need to specify what you want me to play, ${msg.member.displayName}!`);
    } else if (!args[2]){
        msg.channel.send(`:wheelchair: You need to specify an amount of repeats, ${msg.member.displayName}!`);
    } else if (isNaN(Number(args[2])) || Number(args[2]) < 2 || Number(args[2]) > 10) {
        msg.channel.send(`:wheelchair: That's not a valid repeat value, ${msg.member.displayName}! Remember, the maximum amount of repeats is 10.`);
    } else if (!msg.member.voiceChannel){//user not connected to any channel / couldn't be determined
        msg.channel.send(`:wheelchair: It appears you're not connected to any voice channel, ${msg.member.displayName}.`);
    } else {
        music_add(msg,globals,args[1],Number(args[2]));
    }
};
module.exports = {
    "aliases":['listenonrepeat','repeat','playrepeat'],
    "auth":["MUTE_MEMBERS"],
    "help": {
        "short":"Will play the selected song on repeat.",
        "long":"Will add the selected song to the queue for the specified amount. (Max 10)",
        "args": [{"name":"source","required":true,"usage":"To be played YouTube link or local file."},{"name":"amt","required":true,"usage":"Amount of repeats."}],
        "hide": false
    },
    "fn": main,
};