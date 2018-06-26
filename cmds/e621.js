const request = require("request");
const discord = require("discord.js");
module.exports = {
    "aliases":['e621','yiff','furbot','nsfw'],
    "auth":false,
    "help": {
        "short":"Gets a random post from e621.",
        "long":`Will post a random post from e621. You can supply tags like this: \"tag1 tag2 tag3\" (don't forget the quotes.)\nIf used in an NSFW channel or using the bypass flag, it will also include NSFW results.`,
        "args": [{"name":"tags","required":false,"usage":"Tags the bot will use to search."},{"name":"force","required":false,"usage":"Override the NSFW channel check."}],
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send("`⌛ Gathering information... `");
        let nsfw = msg.channel.nsfw || ['force','owo'].includes(args[1]) || ['force','owo'].includes(args[2]);
        let tags = args[1] && !['force','owo'].includes(args[1]) ? args[1] : false;
        let requesturl = `https://e621.net/post/index.json?tags=score:>=${globals.settings.e621_minscore}${!nsfw?"+rating:safe":""}${tags?" "+tags:""}&limit:10`; 
        console.log("requested url: "+ requesturl);
        request({url: requesturl, headers: {"User-Agent":"baabaablackgoat/discord_bot"}},(err,response)=>{
            if (err || response.statusCode != 200) {
                msg.channel.send(`Whoops, something went wrong with the request...`);
                console.log(`Failed to gather e621 information: ${err}`);
            } else {
                tempdata = JSON.parse(response.body);
                data = tempdata[Math.floor(Math.random()*tempdata.length)]
                if (data) {
                    let reply_embed = new discord.RichEmbed({
                        "author": {name:data.author},
                        "description": `Source: <${data.source}>`,
                        "footer": {text: data.tags},
                    });
                    reply_embed.setImage(data.file_url);
                    reply_embed.setColor([0,45,85]);
                    msg.channel.send(reply_embed);
                } else {
                    msg.channel.send(`I am unable to find anything matching these criteria... Please keep in mind that I will only post things with a score better than ${globals.settings.e621_minscore}.`)
                }
            }
        });
    }
};