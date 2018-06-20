const discord = require("discord.js");
const bot = new discord.Client();
const fs = require("fs");
const shlex = require("./shlex.js"); //Made by OllieTerrance on GitHub Gist
const token = require("./token.js");
const cmds = {};
let globals = {
    "queue": [],
    "voice": {connection: null, dispatcher: null},
    "giphy" : require("giphy-api")(token.giphy),
};
let settings = require("./settings.json");

console.log("Attempting to read directory cmds...");
let cmd_temp = fs.readdirSync("./cmds");
for (let i in cmd_temp){
    cmds[cmd_temp[i]] = require(`./cmds/${cmd_temp[i]}`);
}

console.log("Creating message listener...");
bot.on("message",(msg)=>{
    //called every time the bot "sees" a message.

    //if (!some_global.blacklist.includes(msg.author)){
        called_prefix = has_prefix(msg.content);
        if (called_prefix){
            msg.content = msg.content.substr(called_prefix.length);
            let split_msg = shlex(msg.content);
            let called_cmd = command_exists(split_msg[0]); 
            if (called_cmd){                                //Command confirmed to exist, proceed with auth check
                //if (!called_cmd.auth || do_auth_stuff()){   //Needs work: some authentication system.
                    called_cmd.fn(bot,globals,msg,split_msg);           //run dat shiznit
                //}
            } else if (settings.reply_cmd_not_found){   //Command does not exist.
                msg.reply("Sorry, that command does not seem to exist.");
            }
        }
    //} Uncomment me once blacklisting was added.
});

const has_prefix = function(msg_content){
    //checks if the message contains one of any of the prefixes. Returns called prefix or false.
    for (i=0;i<=settings.prefixes.length;i++){
        if (msg_content.startsWith(settings.prefixes[i])){return settings.prefixes[i];}
    }
    return false;
};
const command_exists = function(called){
    //checks if the command exists in the cmds object. Returns respective cmd object or false.
    let ret = false;
    for (let key in cmds){
        if (cmds.hasOwnProperty(key) && cmds[key].aliases.includes(called)){
            ret = cmds[key];
            break;
        }
    }
    return ret;
};

const reload_music_files = require("./modules/reload_music_files.js");
reload_music_files();

bot.on("ready",()=>{
    //runs once the bot is connected to discord using Client.login()
    console.log(`Logged in: ${bot.user.tag}`);
});

console.log("Logging into discord...");
console.log(cmds);
bot.login(token.discord);