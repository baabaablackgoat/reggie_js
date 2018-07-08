const ytdl = require("ytdl-core");
const queue_check = require("./../modules/queue_check.js");

module.exports = function(msg,globals,source,repeats=1){
    let first_item_check = globals.queue.length < 1; //If there was nothing in the queue prior to this, run queue_check to kickstart playback.
    source = source.replace(/^<|>$/g,"");
    if (ytdl.validateURL(source)){
        msg.channel.send(`:hourglass: Hang on while I grab some information...`).then(reply => {
            ytdl.getInfo(source, {filter:"audioonly"},(err,response)=>{
                if (!err){
                    for (let i=0;i<repeats;i++){
                        globals.queue.push({
                            "source": response.video_id,
                            "location": "youtube",
                            "title": response.title,
                            "textchannel": msg.channel,
                            "voicechannel": msg.member.voiceChannel,
                            "requestor": msg.member,
                            "duration": Number(response.length_seconds),
                        });
                    }
                    if (repeats === 1){
                        reply.edit(`:white_check_mark: **${response.title}** has been added to the queue in position **#${globals.queue.length-1}**.`);
                    } else {
                        reply.edit(`:white_check_mark: **${response.title}** has been added to the queue for ${repeats} times, starting from **#${globals.queue.length-repeats}**.`);
                    }
                    if (first_item_check){ //prevent misfires when adding more items to queue
                        queue_check(globals);
                    }
                } else {
                    reply.edit(`:broken_heart: Sorry, something went wrong while gathering information about this YouTube video.`);
                    console.log(`WARN Error while gathering YouTube Metadata (ytdl-core):\n${err}`); 
                }
            });
        });
    } else if (globals.music_files.hasOwnProperty(source)){ 
        for (let i=0;i<repeats;i++){
            globals.queue.push({
                "source": globals.music_files[source].source,
                "location": "local",
                "title": globals.music_files[source].title,
                "textchannel": msg.channel,
                "voicechannel": msg.member.voiceChannel,
                "requestor": msg.member,
                "duration": Number(globals.music_files[source].duration),
            });
        }
        if (repeats === 1){
            msg.channel.send(`:white_check_mark: Local file **${globals.music_files[source].title}** has been added to the queue in position **#${globals.queue.length}**.`);
        } else {
            msg.channel.send(`:white_check_mark: Local file **${globals.music_files[source].title}** has been added to the queue for ${repeats} times, starting from **#${globals.queue.length-repeats}**.`);
        }
        if (first_item_check){ //prevent misfires when having more items to queue
            queue_check(globals);
        }
    } else {
        msg.channel.send(`:x: Sorry, I was unable to process your request. I can only accept YouTube links and files so far.`);
        console.log(source,ytdl.validateURL(source));
    }
};