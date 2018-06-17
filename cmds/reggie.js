const reggies = [
    "https://media.giphy.com/media/sqopK9HtyRHy0/giphy.gif",
    "https://78.media.tumblr.com/2deae067241d8442b02b088778be8f0f/tumblr_okr2noxs4c1r8eddeo1_250.gif",
    "https://media1.tenor.com/images/877ce3e49e5043552953c97467392a1a/tenor.gif?itemid=5381068",
    "https://vignette.wikia.nocookie.net/trollpasta/images/5/52/Reggie.gif",
    "http://1.bp.blogspot.com/-PODT3AddXPs/USmDr0dzNwI/AAAAAAAAAZo/GbnO5PhaNJQ/s1600/Regdalfdemo.gif"
];
const main = function(bot,globals,msg,args){
    msg.channel.send(reggies[Math.floor(Math.random()*reggies.length)]);
};

module.exports = {
    "aliases":['reggie'],
    "auth":false,
    "help": {
        "short":"reggie",
        "long":"r u redy",
        "args": false
    },
    "fn": main
};
