//Hey, you! Should you decide to fork this repository, make sure you change the url in line 12 to YOUR repo link.

const discord = require("discord.js");
const get_git_info = require("git-repo-info");
const main = function(bot,globals,msg,args){
    let info = get_git_info();
    msg.channel.send(new discord.RichEmbed({
        "author": {"name": info.tag ? info.tag : `${info.sha.substr(0,7)} (${info.lastTag})`},
        "timestamp": info.authorDate,
        "title":info.commitMessage,
        "description": info.author,
        "url":`https://github.com/baabaablackgoat/reggie_js/commit/${info.sha}`
    }));
};

module.exports = {
    "aliases":['version'],
    "help": {
        "short":"Shows bot version info",
        "long":"Will display the current sha, the last tag, and other useful things to identify what commit this bot runs on. Also links to the respective commit in the repo.",
        "args": false
    },
    "fn": main
};