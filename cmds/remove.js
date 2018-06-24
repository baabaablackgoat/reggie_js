module.exports = {
    "aliases":['remove','takefromqueue'],
    "auth":"ADMINISTRATOR",
    "help": {
        "short":"Remove specific item from queue.",
        "long":"Removes the item at the specified numerical position. To skip the current song (0), use skip. To see the current queue, use `queue`",
        "args": [{"name":"item","required":true,"usage":"Enter the number of the item you wish to remove."}],
    },
    "fn": function(bot,globals,msg,args){
        if (args[1]){
            let item = parseInt(args[1]);
            if (item && 0 < item < globals.queue.length){
                msg.channel.send(`Removing #${item} (${globals.queue[item].title}).`);
                globals.queue.splice(item,1);
            } else {
                msg.channel.send(`${args[1]} is not a valid queue position.`);
            }
        } else {
            msg.channel.send(`You didn't specify an item to remove.`);
        }
    }
};