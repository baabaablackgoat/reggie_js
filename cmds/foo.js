module.exports = {
    "aliases":['foo','foobar'],
    "auth":false,
    "help": {
        "short":"foobar",
        "long":"foobar",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send("bar");
    }
};