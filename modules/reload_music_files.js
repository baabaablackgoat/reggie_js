/*
This module should eventually read out the music_files directory and create a handy object to do shit with.
You still need to read out mp3 tags, mate.
NOT DONE
*/

const fs = require("fs");
module.exports = function(globals){
    globals.music_files = {};
    fs.readdir("./music_files",(err,data)=>{
        if (!err) {
            for (let file in data){
                let filename = file.replace(/\.[^/.]+$/,"");
                //do something to read out mp3 tags
                let title = `${mp3title ? mp3title : filename}${mp3author ? " by "+mp3author : ""}`;
                globals.music_files[filename] = {
                    "source": `./music_files/${file}`,
                    "title": title,
                };
            }
            console.log(`Music files reloaded, found ${globals.music_files.keys().length} files`)
        }
        else console.log(`WARN Failed to read directory music_files:\n${err}`);
    });
};