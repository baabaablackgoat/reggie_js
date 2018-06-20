const ytdl = require("ytdl-core");
const fs = require("fs");
ytdl.getInfo("https://www.youtube.com/watch?v=-w9GLqXJVIg",(err,info)=>{
    if (err) throw err;
    console.log(info);
});