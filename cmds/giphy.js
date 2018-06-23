const main = function(bot,globals,msg,args){
    globals.giphy.search({q: args[1] ? args[1] : "reggie fils-aime", limit: 20}, (err,res)=>{
        if (err) {
            msg.channel.send("Oopsie woopsie! uwu I made a fucky wucky! A wittle fucko boingo! (API Request errored.)");
            console.log('Giphy request failed. \n',err);
        } else {
            let rand_gif = Math.floor(Math.random()*res.data.length); 
            msg.channel.send(`${res.data[rand_gif].embed_url}\nsource: <${res.data[rand_gif].source}>`);
        }
    });
};

module.exports = {
    "aliases":['giphy','gif'],
    "auth":false,
    "help": {
        "short":"Get a gif from GIPHY.",
        "long":"Get one of the top 20 gifs related to either Reggie Fils-Aime, or a keyword you define.",
        "args": [{"name":"command","required":false,"usage":"Keyword to use in GIF search."}]
    },
    "fn": main
};