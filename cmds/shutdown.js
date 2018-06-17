module.exports = {
    "aliases":['fuckoff','shutdown'],
    "auth":{"discord":"ADMINISTRATOR"},
    "help": {
        "short":"foobar",
        "long":"foobar",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send("okay jeez fine").then(bot.destroy());
    }
};