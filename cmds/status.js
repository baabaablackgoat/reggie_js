//Hey, you! Should you decide to fork this repository, make sure you change the url in line 12 to YOUR repo link.

const discord = require("discord.js");
const get_git_info = require("git-repo-info");
const pretty_ms = require("pretty-ms");

const main = function(bot,globals,msg,args){
    let info = get_git_info();
    msg.channel.send(new discord.RichEmbed({
        "author": {"name": info.tag ? info.tag : `${info.sha.substr(0,7)} (${info.lastTag})`},
        "timestamp": new Date(),
        "title":info.commitMessage,
        "fields": [{name:'Ping',value:String(bot.ping),inline:true},{name:'Last reconnect',value: pretty_ms(bot.uptime),inline:true},{name:'Last reboot',value: pretty_ms(new Date() - globals.bot_start),inline:true}],
        "description": `Bot version committed by ${info.author} on ${info.authorDate}`,
        "url":`https://github.com/baabaablackgoat/reggie_js/commit/${info.sha}`
    }));
};

module.exports = {
    "aliases":['status','version','botinfo'],
    "help": {
        "short":"Shows bot information.",
        "long":"Will display all kinds of things like the ping, last reboot, and version information.",
        "args": false
    },
    "fn": main
};