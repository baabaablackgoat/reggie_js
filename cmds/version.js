const discord = require("discord.js");
const get_git_info = require("git-repo-info");
const main = function(bot,globals,msg,args){
    let info = get_git_info();
    let reply = new discord.RichEmbed({
        "author": {"name": info.tag ? info.tag : `${info.sha.substr(0,7)} (${info.lastTag})`},
        "timestamp": info.authorDate,
        "description": info.commitMessage
    });
};

module.exports = {
    "aliases":['version'],
    "help": {
        "short":"Shows the bot's git version information",
        "long":"seriously thats it",
        "args": false
    },
    "fn": main
};