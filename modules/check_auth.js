/* Takes in the member, an array of permissions, a position, and the globals.
Will return true if the member passes *all* permission checks (AND), otherwise false.*/
const discord = require("discord.js");

module.exports = function checkAuth(member,required_auth,i,globals){
    if (discord.Permissions.FLAGS.hasOwnProperty(required_auth[i])){ //it's a discord permission
        if (member.hasPermission(required_auth[i])){
            if (i+1 >= required_auth.length){
                return true;
            } else {
                i++;
                return checkAuth(member,required_auth,i,globals)
            }
        } else {
            return false;
        }
    } else if (globals.usergroups.hasOwnProperty(required_auth[i])) {
        if (globals.usergroups[required_auth[i]].users.includes(member.id)) {
            if (i+1 >= required_auth.length){
                return true;
            } else {
                i++;
                return checkAuth(member,required_auth,i,globals)
            }
        }
    } else {
        console.log(`WARN Error while authenticating command usage:\nAuthentication ${required_auth[i]} does not exist.`)
        return false;
    }
}