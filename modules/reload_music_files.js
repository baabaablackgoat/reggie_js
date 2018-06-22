/*
This module should eventually read out the music_files directory and create a handy object to do shit with.
*/

const fs = require("fs");
const node_id3 = require("node-id3");

const id3_recursive = function(data,globals,i){
    let filename = data[i].replace(/\.[^/.]+$/,"");
    node_id3.read(`./music_files/${data[i]}`, (err,tags)=>{
        if (err) {console.log(`WARN Error while attempting to read ID3:\n{err}`);}
        globals.music_files[filename] = {
            "source": `./music_files/${data[i]}`,
            "title": `${tags.title ? tags.title : filename}${tags.author ? " by "+tags.author : ""}`
        }
        i++;
        if (i < data.length){
            id3_recursive(data,globals,i);
        } else {
            console.log(`INFO Music files reloaded, found ${Object.keys(globals.music_files).length} file(s)`);
        }
    });
}

module.exports = function(globals){
    globals.music_files = {};
    fs.readdir("./music_files",(err,data)=>{
        if (!err) {
            if (data.length > 0){
                id3_recursive(data,globals,0);
            } else console.log(`INFO No files found in directory music_files.`);
        }
        else console.log(`WARN Failed to read directory music_files:\n${err}`);
    });
};