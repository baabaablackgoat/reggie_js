/*
This module should eventually read out the music_files directory and create a handy object to do shit with.
You still need to read out mp3 tags, mate.
NOT DONE
*/

const fs = require("fs");
const node_id3 = require("node-id3");
module.exports = function(globals){
    globals.music_files = {};
    fs.readdir("./music_files",(err,data)=>{
        if (!err) {
            for (let file in data){
                let filename = data[file].replace(/\.[^/.]+$/,"");
                node_id3.read(`./music_files/${data[file]}`, (err,tags)=>{
                    if (err) {console.log(`WARN Error while reading ID3 tag:\n${err}`);}
                    let title = `${tags.title ? tags.title : filename}${tags.author ? " by "+tags.author : ""}`;
                    globals.music_files[filename] = {
                        "source": `./music_files/${data[file]}`,
                        "title": title,
                    };
                });
            }
            console.log(`Music files reloaded, found ${Object.keys(globals.music_files).length} files`);
        }
        else console.log(`WARN Failed to read directory music_files:\n${err}`);
    });
};