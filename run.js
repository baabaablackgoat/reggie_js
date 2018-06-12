const discord = require("discord.js")
const bot = new discord.Client()
const fs = require("fs")
const token = fs.readFileSync("./token.txt");

console.log("Attempting to read directory cmds...");
const cmds = fs.readdirSync("./cmds");
console.log("Found "+ cmds);
console.log("Creating message listener...");
console.log("Logging into discord...");
bot.login()