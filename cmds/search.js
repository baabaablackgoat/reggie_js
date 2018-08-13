const request = require('request');
const discord = require('discord.js');
const music_add = require("./../modules/music_add.js");

//const emojicharacters= require('./../modules/emojicharacters.js');

/* i'm too dumb for this
const react_incremental = function(sent_message,items_length,pos){
    sent_message.react(emojicharacters[pos]).then(reaction=>{
        if (pos < items_length) {react_incremental(sent_message,items_length,pos+1);} //ARRAYS START AT ONE Kappa
    });
};
*/

const main = function(bot,globals,msg,args){
    if (!msg.member.voiceChannel){//user not connected to any channel / couldn't be determined
        msg.channel.send(`:wheelchair: It appears you're not connected to any voice channel, ${msg.member.displayName}.`);
    } else if (args[1]){
        let query = args.slice(1).join(" ").replace(/[^\w\s]/gi, '');
        msg.channel.send(`:mag: Attempting to look up ${query} on YouTube...`).then(sent_message=>{
            request(`https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&key=${globals.token.google}&q=${query}`,(err,response,body)=>{
                if (err) {
                    sent_message.edit(`:x: Something went wrong... Bother your bot admin about it, will ya?`);
                    console.log(`FATAL Error while requesting from YouTube API v3\n${err}`);
                } else if (response.statusCode != 200){
                    sent_message.edit(`:x: The API request didn't resolve properly. Please try again later. (Status code **${response.statusCode}**)`);
                    console.log(`WARN YouTube API v3 failed looking up ${query}:\n${response.statusCode} ${response.statusMessage}`);
                } else {
                    let API_Response = JSON.parse(body);
                    //console.log(API_Response.items);
                    let items = API_Response.items;
                    let richEmbed = new discord.RichEmbed({title:`Search results for ${query}`});
                    richEmbed.setColor("RED");
                    for (let i=0;i<items.length;i++){
                        richEmbed.addField(String(i+1),`${items[i].snippet.title} <https://youtu.be/${items[i].id.videoId}>`);
                    }
                    sent_message.edit(richEmbed).then(sent_message=>{
                        /*
                        react_incremental(sent_message,items.length,1);
                        let reactcollector = new discord.ReactionCollector(sent_message,(reaction)=>{return reaction.users.has(msg.author.id);},{time: 10000,max:1});
                        */
                        let messagecollector = new discord.MessageCollector(sent_message.channel,msgdata=>{
                            let valid_replies = ['exit'];
                            for (let i=0;i<items.length;i++){valid_replies.push(String(i+1));}
                            return msgdata.author.id == msg.author.id && valid_replies.includes(msgdata.content);
                        },{time:10000,maxMatches:1});
                        messagecollector.on('end',(collected,reason)=>{
                            if (reason == 'time'){
                                msg.channel.send(`:clock1: Search timed out. Please reply with the corresponding number you wish to queue, or with exit to abort.`);
                            } else if (reason == 'matchesLimit') {
                                let reply_message = collected.first();
                                if (reply_message.content == "exit"){
                                    msg.channel.send(`:no_entry_sign: Search has been aborted.`);
                                } else if (!msg.member.voiceChannel){//make sure the user is still connected to a vc to avoid nasty bugs.
                                    msg.channel.send(`:wheelchair: You have left your voice channel before the search has concluded. Aborting.`);
                                } else {
                                    music_add(msg,globals,`youtube.com/watch?v=${items[Number(reply_message.content)].id.videoId}`,1);
                                }
                            } else {
                                msg.channel.send(`:x: Something went very wrong. Sorry about that...`);
                                console.log(`WARN: Search message collector stopped with reason ${reason}`);
                            }
                        });
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