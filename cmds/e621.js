const request = require("request");
module.exports = {
    "aliases":['e621','yiff','furbot','nsfw'],
    "auth":false,
    "help": {
        "short":"Gets a random post from e621.",
        "long":"Will post a random post from e621 (Score >= 10). You can supply tags like this: \"tag1 tag2 tag3\" (don't forget the quotes.)\nIf used in an NSFW channel or using the bypass flag, it will also include NSFW results.",
        "args": [{"name":"tags","required":false,"usage":"Tags the bot will use to search."},{"name":"force","required":false,"usage":"Override the NSFW channel check."}],
    },
    "fn": function(bot,globals,msg,args){
        let nsfw = msg.channel.nsfw || ['force','owo'].includes(args[1]) || ['force','owo'].includes(args[2]);
        let tags = args[1] && !['force','owo'].includes(args[1]) ? args[1] : false;
        let requesturl = `https://e621.net/post/index.json?tags=score:>=10${!nsfw?"+rating:safe":""}${tags?"+"+tags:""}&limit:10`; 
        console.log("requested url: "+ requesturl);
        request({url: requesturl, headers: {"User-Agent":"baabaablackgoat/discord_bot"}},(err,response)=>{
            if (err || response.statusCode != 200) {
                msg.channel.send(`Whoops, something went wrong with the request...`)
                console.log(`Failed to gather e621 information: ${err}`);
            } else {
                msg.channel.send(`data sent to console (still not done)`);
                data = JSON.parse(response.body);
            }
        });
    }
};