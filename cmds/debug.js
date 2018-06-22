module.exports = {
    "aliases":['debug'],
    "auth": "ADMINISTRATOR",
    "help": {
        "short":"Debug/test command, electric boogaloo",
        "long":"owo whats this",
        "args": false
    },
    "ratelimit": {"time":60000,"calls": 3},
    "fn": function(bot,globals,msg,args){
        msg.channel.send(`something something debug`);
    }
};