const request = require("request");
const main = function(bot,globals,msg,args){
    if (args[1]){
        msg.channel.send(`:hammer_pick: I'm still trying to figure out how the Google API works. ~baabaablackgoat`);
    } else {
        msg.channel.send(`:wheelchair: You didn't specify any query, ${msg.member.displayName}.`);
    }
};

module.exports = {
    "aliases":['search','find','findme'],
    "auth":false,
    "help": {
        "short":"WIP Look up a video on YT and queue it on demand.",
        "long":"Still a WIP",
        "args": [{"name":"query","required":true,"usage":"The query that needs to be looked up."}]
    },
    "fn": main
};