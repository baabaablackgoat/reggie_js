module.exports = function(called,cmds){
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