/*
This module could possibly be merged with the play command itself.
It currently takes in the bot, global vars, the invoking message, and the to be checked link/name.
CHECK: Is the user in a voice channel? 
    >NO: Revoke request.
CHECK: Is the provided argument a valid youtube url? (Should validateURL not suffice, use the regex below.)
    >YES: Attempt to grab the required metadata from the video, and append the item to the global queue. 
        STOP >>|
CHECK: Is the provided argument a valid file in music_files (requires reload_music_files to be run at least once!)
    >YES: Gather the information stored in the object and push it to the queue.
        STOP >>|
If the previous checks failed, no suppported format was found. Warn the user.
 */
//const yt_regex = /\S*(youtube\.com\/watch|youtu\.be)\S*/ig;
/*
    "source": "local" || "youtube" || TBD,
    "location": url || dir,
    "title": if determinable, title.
    "textchannel": the text channel in which the song was requested. NOT THE ID OF THE CHANNEL.
    "voicechannel": the voice channel in which the song was requested.  
    "requestor": the user that created the song.
*/
const ytdl = require("ytdl-core");
module.exports = function(bot,globals,msg,src){
    if (!msg.author.voiceChannelId){//user not connected to any channel / couldn't be determined
        msg.channel.send(`:wheelchair: It appears you're not connected to any voice channel, ${msg.author.displayName}.`);
    } else if (ytdl.validateURL(src)){
        msg.channel.send(`:hourglass: Hang on while I grab some information...`).then(reply => {
            ytdl.getInfo("src", {filter:"audioonly"},(err,response)=>{
                if (!err){
                    globals.queue.push({
                        "source": response.video_id,
                        "location": "youtube",
                        "title": response.title,
                        "textchannel": msg.channel,
                        "voicechannel": msg.author.voicechannel,
                        "requestor": msg.author
                    });
                    reply.edit(`:white_check_mark: **${response.title}** has been added to the queue in position **${globals.queue.length}**.`);
                } else {
                    reply.edit(`:broken_heart: Sorry, something went wrong while gathering information about this YouTube video.`);
                    console.log(`WARN Error while gathering YouTube Metadata (ytdl-core):\n${err}`); 
                }
            });
        });
    } else if (globals.music_files.hasOwnProperty(src)){ 
        globals.queue.push({
            "source": globals.music_files[src].source,
            "location": "local",
            "title": globals.music_files[src].title,
            "textchannel": msg.channel,
            "voicechannel": msg.author.voicechannel,
            "requestor": msg.author
        });
        msg.channel.send(`:white_check_mark: Local file **${globals.music_files[src].title}** has been added to the queue in position **${globals.queue.length}**.`);
    } else {
        msg.channel.send(`:x: Sorry, I was unable to process your request. I can only accept YouTube links and files so far.`);
    }
};