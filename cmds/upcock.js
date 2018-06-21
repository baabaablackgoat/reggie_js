module.exports = {
    "aliases":['upcock'],
    "auth":false,
    "help": {
        "short":"it's a classic.",
        "long":":chicken:",
        "args": false
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send(":chicken:");
    }
};