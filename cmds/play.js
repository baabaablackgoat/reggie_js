const ytdl = require("ytdl-core");
const queue_check = require("./../modules/queue_check.js");
const main = function(bot,globals,msg,args){
    if (!args[1]){
        msg.channel.send(`:wheelchair: You need to specify what you want me to play, ${msg.member.displayName}!`);
    } else if (!msg.member.voiceChannel){//user not connected to any channel / couldn't be determined
        msg.channel.send(`:wheelchair: It appears you're not connected to any voice channel, ${msg.member.displayName}.`);
    } else if (ytdl.validateURL(args[1])){
        msg.channel.send(`:hourglass: Hang on while I grab some information...`).then(reply => {
            ytdl.getInfo(args[1], {filter:"audioonly"},(err,response)=>{
                if (!err){
                    globals.queue.push({
                        "source": response.video_id,
                        "location": "youtube",
                        "title": response.title,
                        "textchannel": msg.channel,
                        "voicechannel": msg.member.voiceChannel,
                        "requestor": msg.member
                    });
                    reply.edit(`:white_check_mark: **${response.title}** has been added to the queue in position **${globals.queue.length}**.`);
                    if (globals.queue.length <= 1){ //prevent misfires when adding more items to queue
                        queue_check(bot,globals);
                    }
                } else {
                    reply.edit(`:broken_heart: Sorry, something went wrong while gathering information about this YouTube video.`);
                    console.log(`WARN Error while gathering YouTube Metadata (ytdl-core):\n${err}`); 
                }
            });
        });
    } else if (globals.music_files.hasOwnProperty(args[1])){ 
        globals.queue.push({
            "source": globals.music_files[args[1]].source,
            "location": "local",
            "title": globals.music_files[args[1]].title,
            "textchannel": msg.channel,
            "voicechannel": msg.member.voiceChannel,
            "requestor": msg.member
        });
        msg.channel.send(`:white_check_mark: Local file **${globals.music_files[args[1]].title}** has been added to the queue in position **${globals.queue.length}**.`);
        if (globals.queue.length <= 1){ //prevent misfires when having more items to queue
            queue_check(bot,globals);
        }
    } else {
        msg.channel.send(`:x: Sorry, I was unable to process your request. I can only accept YouTube links and files so far.`);
        console.log(args[1],ytdl.validateURL(args[1]));
    }
};

module.exports = {
    "aliases":['play'],
    "auth":false,
    "help": {
        "short":"foobar",
        "long":"foobar",
        "args": false
    },
    "fn": main
};