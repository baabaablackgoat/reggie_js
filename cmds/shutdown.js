module.exports = {
    "aliases":['fuckoff','shutdown'],
    "auth":["owner"],
    "help": {
        "short":"Shuts down the bot.",
        "long":"Will log off the bot from discord and close the Node console.",
        "args": false,
        "hide": true
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send("okay jeez fine").then(bot.destroy());
    }
};