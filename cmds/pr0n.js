module.exports = {
    "aliases":['pron','pr0n','porn','yiff','e621'],
    "auth":false,
    "help": {
        "short":"Coming soon owo",
        "long":"Will eventually gather some NSFW from e621. <W<",
        "args": [{"name":"tags","required":false,"usage":"Tags the bot will use to search."}],
        "hide": true,
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send("no.\nt yet, you degenerate (/owo\\)");
    }
};