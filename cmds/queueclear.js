const main = function(bot,globals,msg,args){
    if (!globals.voice.dispatcher){
        msg.channel.send(`There's nothing playing right now.`);
    } else {
        globals.queue = [];
        globals.voice.dispatcher.end(`Queue cleared by ${msg.member.displayName}`);
        msg.channel.send(`Queue cleared.`);
    }
};

module.exports = {
    "aliases":['flushqueue','clearqueue','nomoremusic','stopthefunk'],
    "auth":["ADMINISTRATOR"],
    "help": {
        "short":"Empties the queue, stops playback.",
        "long":"Will forcefully stop all music playback and clear the queue.",
        "args": false,
        "hide": false
    },
    "fn": main,
};