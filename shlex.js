/*
    Made by OllieTerrance on Github Gist.
    https://gist.github.com/OllieTerrance/6280851
    I added the comments to this script attempting to understand what it does.
    Sorry if they sound a little rude, I was genuinely confused sometimes.
*/
module.exports = function (str) {
    var args = str.split(" "); //args = string split at spaces, no matter what happened before
    var out = [];              //define out as empty array
    var lookForClose = -1;      
    var quoteOpen = false;     
    for (var x in args) {      //for every item in args as x:
        if (args.hasOwnProperty(x)) { //Why is this a thing? args is an array, NOT an object! ...right?
            var arg = args[x];      //current arg shorthand
            var escSeq = false;     //I guess this defines the escape sequence
            for (var y in arg) {    //ooookayyy, appparently, this turns into a list of numbers basically indexing the string. til
                if (escSeq) {       //if a character was escaped before, stop escaping it
                    escSeq = false;         
                } else if (arg[y] === "\\") { //if there's two slashes here, escape the damn slash
                    escSeq = true;
                } else if (arg[y] === "\"") { //escaped double-quote
                    quoteOpen = !quoteOpen; //toggle quote setting
                }
            }
            if (!quoteOpen && lookForClose === -1) { //if there was no quote and it's not looking for another one,
                out.push(arg);                       //output the current space-seperated arg
            } else if (quoteOpen && lookForClose === -1) { //however, if there was a quote and no matching quote in the same split:
                lookForClose = x;                          //set lookForClose to the current argument index.
            } else if (!quoteOpen && lookForClose >= 0) {  //if lookForClose was initialized before (in a previous blocksplit)
                var block = args.slice(lookForClose, parseInt(x) + 1).join(" "); //join all elements since that quote up to the current one with spaces.
                escSeq = false; //Reset escape sequence to be safe?
                var quotes = []; //store quotes
                for (var z in block) { //nani the fuck
                    if (escSeq) { //stop escapesequence (basically, skip the character after the escaped string?)
                        escSeq = false; 
                    } else if (block[z] === "\\") {//enable ass-ca-pee
                        escSeq = true;
                    } else if (block[z] === "\"") {//is ~~boris~~ quote
                        quotes.push(z); //push into array
                    }
                }
                var parts = [];
                parts.push(block.substr(0, quotes[0])); //push the bit of the current block from start to BEFORE 1st quotepos.
                parts.push(block.substr(parseInt(quotes[0]) + 1, quotes[1] - (parseInt(quotes[0]) + 1))); //push 1st quote
                parts.push(block.substr(parseInt(quotes[1]) + 1));
                block = parts.join("");
                out.push(block);
                lookForClose = -1;
            }
        }
    }
    return quoteOpen ? false : out;
}

// console.log(shlex(`some_command "some long arg that has spaces" foo bar b'ez \mlady`));