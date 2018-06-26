let replies = {
    reggie: ["https://media.giphy.com/media/sqopK9HtyRHy0/giphy.gif",
        "https://78.media.tumblr.com/2deae067241d8442b02b088778be8f0f/tumblr_okr2noxs4c1r8eddeo1_250.gif",
        "https://media1.tenor.com/images/877ce3e49e5043552953c97467392a1a/tenor.gif?itemid=5381068",
        "https://vignette.wikia.nocookie.net/trollpasta/images/5/52/Reggie.gif",
        "http://1.bp.blogspot.com/-PODT3AddXPs/USmDr0dzNwI/AAAAAAAAAZo/GbnO5PhaNJQ/s1600/Regdalfdemo.gif"],
    upcock: [":chicken:"],
    hentai: [":chicken:\n:necktie:",
        "http://vignette4.wikia.nocookie.net/walkingdead/images/0/00/Hen_in_a_tie.jpg/revision/latest/scale-to-width-down/1024?cb=20140430133107"],
    fix: ["volvo pls fix\nhttp://starecat.com/content/wp-content/uploads/engineer-engifar-engiwherever-you-are-titanic.jpg",
        "volvo pls fix\nhttp://i.imgur.com/8mcP4wG.jpg",
        "https://www.youtube.com/watch?v=rp8hvyjZWHs"],
    guessilldie: ['https://i.redditmedia.com/DMhY_-i-VVj4bfpGaVwP9iTKvOTlzC1cLf2QOC8LRuw.jpg?w=1024&s=1f1fbcf502033f6055eb803c10fcca42'],
    bang: [":gun: We'll bang, okay?",":gun: https://www.youtube.com/watch?v=oApBrFAtRrc"],
    octagon: ["https://www.youtube.com/watch?v=tiOXY1fuv4k"],
};
replies.cock = replies.upcock;
replies.hentie = replies.hentai;

module.exports = {
    "aliases":Object.keys(replies),
    "auth":false,
    "help": {
        "short":"Silly little (in-)jokes.",
        "long":":chicken:",
        "args": false,
        "hide": true,
    },
    "fn": function(bot,globals,msg,args){
        msg.channel.send(replies[args[0]][Math.floor(Math.random()*replies[args[0]].length)]);
    }
};