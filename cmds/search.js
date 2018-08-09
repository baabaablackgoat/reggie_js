const request = require('request');
const discord = require('discord.js');
const emojicharacters= require('./../modules/emojicharacters.js');

const react_incremental = function(sent_message,items_length,pos){
    sent_message.react(emojicharacters[pos]).then(reaction=>{
        if (pos < items_length) {react_incremental(sent_message,items_length,pos+1);} //ARRAYS START AT ONE Kappa
    });
}

const main = function(bot,globals,msg,args){
    if (args[1]){
        let query = args.slice(1).join(" ").replace(/[^\w\s]/gi, '');
        msg.channel.send(`:mag: Attempting to look up ${query} on YouTube...`).then(sent_message=>{
            request(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${globals.token.google}&q=${query}`,(err,response,body)=>{
                if (err) {
                    sent_message.edit(`:x: Something went wrong... Bother your bot admin about it, will ya?`);
                    console.log(`FATAL Error while requesting from YouTube API v3:\n${err}`);
                } else if (response.statusCode != 200){
                    sent_message.edit(`:x: The API request didn't resolve properly. Please try again later. (Status code **${response.statusCode}**)`);
                    console.log(`WARN YouTube API v3 failed looking up ${query}:\n${response.statusCode} ${response.statusMessage}`);
                } else {
                    let API_Response = JSON.parse(body);
                    console.log(API_Response.items);
                    let items = API_Response.items;
                    let richEmbed = new discord.RichEmbed({title:`Search results for ${query}`});
                    richEmbed.setColor("RED");
                    for (let i=0;i<items.length;i++){
                        richEmbed.addField(String(i+1),`${items[i].snippet.title} <https://youtu.be/${items[i].id.videoId}>`);
                    }
                    sent_message.edit(richEmbed).then(sent_message=>{
                        react_incremental(sent_message,items.length,1);
                    });
                }
            });
            
        });
    } else {
        msg.channel.send(`:wheelchair: You didn't specify any query, ${msg.member.displayName}.`);
    }
};

module.exports = {
    "aliases":['search','find','findme'],
    "auth":false,
    "valid_channel_types": ["text"],
    "help": {
        "short":"WIP Look up a video on YT and queue it on demand.",
        "long":"Still a WIP",
        "args": [{"name":"query","required":true,"usage":"The query that needs to be looked up."}]
    },
    "fn": main
};