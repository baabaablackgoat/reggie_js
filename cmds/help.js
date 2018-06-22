const discord = require("discord.js");
const command_exists = require("./../modules/command_exists");
const main = function(bot,globals,msg,args){
    if (!args[1]){ //No arg specified
        let reply = new discord.RichEmbed({title: "reggie.js help"});
        let cmdkeys = Object.keys(globals.cmds);
        let replystring = "";
        for (let key in cmdkeys){
            if (globals.cmds[cmdkeys[key]].help.hasOwnProperty("hide") && globals.cmds[cmdkeys[key]].help.hide){
                continue;
            } else {
                replystring += `\`${globals.cmds[cmdkeys[key]].aliases[0]}\`${" ".repeat(12-globals.cmds[cmdkeys[key]].aliases[0].length)}${globals.cmds[cmdkeys[key]].help.short}\n`
            }
        };
        reply.addField("All commands:",replystring)
        msg.channel.send(reply);
    } else {
        cmdeval = command_exists(args[1],globals.cmds);
        if (cmdeval){
            let reply = new discord.RichEmbed({
                title: `Command: ${args[1]}`,
                fields: [{name:"Description",value:cmdeval.help.short,inline:true},{name:"Aliases",value:cmdeval.aliases.join(", "),inline:true},{name:"Documentation",value:cmdeval.help.long}],
            });
            reply.setColor([255,125,0]);
            if (cmdeval.help.args){
                let argsstring = "";
                for (let i=0;i<cmdeval.help.args.length;i++){
                    argsstring += `\`${cmdeval.help.args[i].name}\`${cmdeval.help.args[i].required ? "*" : ""}\t${cmdeval.help.args[i].usage}\n`;
                }
                reply.setFooter("Arguments marked with * are required.");
                reply.addField("Arguments",argsstring);
            }
            msg.channel.send(reply);
        } else {
            msg.channel.send(`${args[1]} is not a valid command.`);
        }
    }
}



module.exports = {
    "aliases":['help','whatis'],
    "help": {
        "short":"Get help with bot commands.",
        "long":"Unfortunately, this command does not provide life support or call 911.",
        "args": [{"name":"command","optional":true,"usage":"Provide help for specified command."}],
        "hide": false
    },
    "fn": main
};