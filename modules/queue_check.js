/*
This module should do the following when called:
CHECK - Is there a song still in the queue?
    NO: Disconnect from channel, clear out vars. We're done here. >>|
    YES: Connect to (possibly new) voice channel.
If all checks have passed, start playing the item in queue with its respective method.
Create listeners for errors, and the dispatcher finishing up the stream.
Once the dispatcher has finished, remove the just played item from the queue, and recurse into the function.

Queue elements look like this:
{
    "source": "local" || "youtube" || TBD,
    "location": url || dir,
    "title": if determinable, title. Should author property be derterminable, apppend it seperated by "by"
    "textchannel": the text channel in which the song was requested. NOT THE ID OF THE CHANNEL.
    "voicechannel": the voice channel in which the song was requested. 
    "requestor": the user that created the request.
}
*/
const ytdl = require("ytdl-core");

module.exports = function queue_check(bot,globals){
    globals.votes.music_skip = [];
    if (globals.queue.length === 0){ //If there's nothing left in the queue, disconnect and clear global variables.
        globals.voice.connection.disconnect();
        globals.voice.connection = globals.voice.dispatcher = null;
    } else {
        globals.queue[0].voicechannel.join() //Establish a connection to the channel. *SHOULD* not cause problems when the channel is already correct. No guarantees.
            .then(con => {
                globals.voice.connection = con;
                if (globals.queue[0].location == "youtube"){
                    let readable_stream = ytdl(globals.queue[0].source,{filter:"audioonly"});
                    globals.voice.dispatcher = con.playStream(readable_stream,{passes:3});
                } else if (globals.queue[0].location == "local"){
                    globals.voice.dispatcher = con.playFile(globals.queue[0].source,{passes: 3});
                }
                globals.queue[0].textchannel.send(`:musical_note: Now playing **${globals.queue[0].title}**, queued by ${globals.queue[0].requestor.displayName}, in ${globals.queue[0].voicechannel.name}`);
                globals.voice.dispatcher.on("end",(reason)=>{ //Dispatcher has finished (Probably because the file/stream ended.)
                    globals.queue.shift(); //Remove the item that was just played from queue.
                    if (reason !=="Stream is not generating quickly enough.") console.log(reason); //this happens when the stream is over
                    queue_check(bot,globals); //R E C U R S I O N
                });
                globals.voice.dispatcher.on("error",(err)=>{
                    console.log(`WARN Voice dispatcher errored:\n${err}`);
                });
            })
        .catch(err =>{
            globals.queue[0].textchannel.send(`I wasn't able to join the voice channel for **${globals.queue[0].title}**. Skipping.`);
            console.log(`Failed to join voicechannel:\n${err}`);
            globals.queue.shift(); //Skip, cause there never was a dispatcher
            queue_check(bot,globals); //Attempt to play next thing
        });
    }
};