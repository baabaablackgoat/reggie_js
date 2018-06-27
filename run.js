const discord = require("discord.js");
const bot = new discord.Client();
const fs = require("fs");
const shlex = require("./modules/shlex.js"); //Made by OllieTerrance on GitHub Gist
const command_exists = require("./modules/command_exists");
const checkAuth = require("./modules/check_auth");
const token = require("./token.js");
const cmds = {};
if (!fs.existsSync("./settings.json")){fs.copyFileSync("./templates/settings_template.json","./settings.json");}
let settings = require("./settings.json");
if (!fs.existsSync("./usergroups.json")){fs.copyFileSync("./templates/usergroups_template.json","./usergroups.json");}
let globals = {
    "cmds": cmds,
    "queue": [], //used for the music bit
    "votes": {"music_skip":[]}, //collects votes - currently only for music
    "voice": {"connection": null, "dispatcher": null}, //stores information about where
    "giphy" : require("giphy-api")(token.giphy),
    "ratelimit": {},
    "settings": settings,
    "usergroups": {},
};

console.log("INFO Attempting to read directory cmds...");
let cmd_temp = fs.readdirSync("./cmds");
for (let i in cmd_temp){
    cmds[cmd_temp[i]] = require(`./cmds/${cmd_temp[i]}`);
}

console.log("INFO Creating message listener...");
bot.on("message",(msg)=>{
    //called every time the bot "sees" a message.
    if (!msg.author.bot) { //avoid replying to bot messages. 
        if (msg.channel.type !== "text"){ //Avoiding nasty crashes.
            msg.channel.send(`Sorry, but I currently don't support DM commands.`);
        } else {
            //if (!some_global.blacklist.includes(msg.author)){
                called_prefix = has_prefix(msg.content);
                if (called_prefix){
                    msg.content = msg.content.substr(called_prefix.length);
                    let split_msg = shlex(msg.content);
                    let called_cmd = command_exists(split_msg[0],cmds); 
                    if (called_cmd){                    //Command confirmed to exist, proceed with auth check
                        if (auth(msg,called_cmd)){      //User authentication
                            if (ratelimit(called_cmd)){ //Ratelimiting
                                called_cmd.fn(bot,globals,msg,split_msg);   //run dat shiznit
                            } else { //Ratelimit reached
                                msg.channel.send(`This command has a ratelimit which has been reached. Try again later.`);
                            }                  
                        } else { //Auth failed
                            msg.channel.send(`There is an authority check on this command, and you failed to pass it, ${msg.member.displayName}.\nRequired authentication: ${called_cmd.auth}`);
                        }
                    } else if (settings.reply_cmd_not_found){   //Command does not exist.
                        msg.reply("Sorry, that command does not seem to exist.");
                    }
                }
            //} Uncomment me once blacklisting was added.
        }
    }
});

const has_prefix = function(msg_content){
    //checks if the message contains one of any of the prefixes. Returns called prefix or false.
    for (i=0;i<=settings.prefixes.length;i++){
        if (msg_content.startsWith(settings.prefixes[i])){return settings.prefixes[i];}
    }
    return false;
};

const ratelimit = function(called_cmd){
    //Checks if the command has a ratelimit, and if it has reached this limit. Returns true if execution is ok, and false if ratelimit is reached.
    // Ratelimited commands get this addl. property in their exports object: {"time": time in ms, "calls": amt of calls allowed in time} 
    if (called_cmd.hasOwnProperty("ratelimit") && called_cmd.ratelimit){ //both "ratelimit": false and no property at all are valid.
        if (!globals.ratelimit.hasOwnProperty(called_cmd)){ //create entry if necessary
            globals.ratelimit[called_cmd] = {"timestamp": 0, "calls": 0}
        } 
        if (globals.ratelimit[called_cmd].timestamp <= Date.now()){ //timestamp has expired. make new timestamp and reset calls amt.
            globals.ratelimit[called_cmd] = {"timestamp": Date.now() + called_cmd.ratelimit.time, "calls": 0}  
        } 
        globals.ratelimit[called_cmd].calls++;
        return globals.ratelimit[called_cmd].calls <= called_cmd.ratelimit.calls; //will return true if calls are less or equal to limit.
    } else { //no ratelimit
        return true;
    }
}
const auth = function(msg,called_cmd){
    if (called_cmd.hasOwnProperty("auth") && called_cmd.auth) { //both "auth": false and no property at all are valid.
        if (typeof called_cmd.auth === "string") {called_cmd.auth = [called_cmd.auth]; console.log(`INFO Auth property of ${called_cmd.aliases[0]} should be an array.`);}
        try {
            return checkAuth(msg.member,called_cmd.auth,0,globals);
        } catch (err) { //When in doubt, do not allow usage, and log this.
            console.log(`WARN Error while authenticating command usage:\n${err}`)
            return false;
        }
    } else {
        return true;
    }
}

const reload_usergroups = function(){
    globals.usergroups = JSON.parse(fs.readFileSync("./usergroups.json"));
    for (let key in globals.usergroups){
        if (globals.usergroups[key].hasOwnProperty("inherits")){
            for (let i=0;i<globals.usergroups[key].inherits.length;i++){
                globals.usergroups[globals.usergroups[key].inherits[i]].users = globals.usergroups[globals.usergroups[key].inherits[i]].users.concat(globals.usergroups[key].users);
            }
        }
    }
    console.log(`INFO Usergroups reloaded, inheritance applied.`);
}
reload_usergroups();

const reload_music_files = require("./modules/reload_music_files.js");
reload_music_files(globals);

bot.on("ready",()=>{
    //runs once the bot is connected to discord using Client.login()
    console.log(`INFO Logged in: ${bot.user.tag}`);
});

bot.on("error",(err)=>{
    console.error(`FATAL Error in client:\n${err}`);
});
bot.on("reconnecting",()=>{
    console.log(`INFO Attempting to reconnect...`);
});

console.log("INFO Logging into discord...");

bot.login(token.discord);