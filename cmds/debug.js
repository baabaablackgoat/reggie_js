const discord = require("discord.js");
module.exports = {
    "aliases":['debug'],
    "auth": ["ADMINISTRATOR","owner"],
    "help": {
        "short":"Debug/test command, electric boogaloo",
        "long":"owo whats this",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send(`something something debug`);
        console.log("zuccess")
    }
};