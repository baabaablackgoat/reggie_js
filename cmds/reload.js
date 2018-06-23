const reload_music_files = require("./../modules/reload_music_files");
module.exports = {
    "aliases":['reload'],
    "auth": "ADMINISTRATOR",
    "help": {
        "short":"Reloads assets.",
        "long":"Reloads certain objects/files that can be modified during runtime without repercussions, like the local music file list.",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send(`Assets are being reloaded.`);
        reload_music_files(globals);
    }
};