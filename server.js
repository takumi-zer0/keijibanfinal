const express = require('express')
const app = express()
// const cors = require('cors')

// app.use(cors)

const words = {
    "a": "[1,2],[0,3],[0,1,2,3],[0,3],[0,3]",
    "b": "[0,1,2],[0,3],[0,1,2],[0,3],[0,1,2]",
    "c": "[1,2],[0,3],[0],[0,3],[1,2]",
    "d": "[0,1,2],[0,3],[0,3],[0,3],[0,1,2]",
    "e": "[0,1,2,3],[0],[0,1,2],[0],[0,1,2,3]",
    "f": "[0,1,2,3],[0],[0,1,2],[0],[0]",
    "g": "[1,2,3],[0],[0,2,3],[0,3],[1,2,3]",
    "h": "[0,3],[0,3],[0,1,2,3],[0,3],[0,3]",
    "i": "[0,1,2],[1],[1],[1],[0,1,2],[3]",
    "j": "[3],[3],[3],[0,3],[1,2]",
    "k": "[0,3],[0,2],[0,1],[0,2],[0,3]",
    "l": "[0],[0],[0],[0],[0,1,2],[3]",
    "m": "[0,4],[0,1,3,4],[0,2,4],[0,4],[0,4],[5]",
    "n": "[0,3],[0,1,3],[0,2,3],[0,3],[0,3]",
    "o": "[1,2],[0,3],[0,3],[0,3],[1,2]",
    "p": "[0,1,2],[0,3],[0,1,2],[0],[0]",
    "q": "[1,2],[0,3],[0,3],[0,2,3],[1,2,3]",
    "r": "[0,1,2],[0,3],[0,1,2],[0,2],[0,3]",
    "s": "[1,2,3],[0],[1,2],[3],[0,1,2]",
    "t": "[0,1,2],[1],[1],[1],[1],[3]",
    "u": "[0,3],[0,3],[0,3],[0,3],[1,2]",
    "v": "[0,2],[0,2],[0,2],[0,2],[1],[3]",
    "w": "[0,4],[0,4],[0,2,4],[0,2,4],[1,3],[5]",
    "x": "[0,2],[0,2],[1],[0,2],[0,2],[3]",
    "y": "[0,2],[0,2],[0,1,2],[1],[1],[3]",
    "z": "[0,1,2,3],[3],[2],[1],[0,1,2,3]",
    " ": "[],[],[],[],[],[0]",
    "!": "[0],[0],[0],[],[0],[1]",
    "?": "[0,1],[2],[0,1],[],[0]",
}



app.set('view engine', 'ejs')
app.use(express.urlencoded({ extended: false }));

var arr = [[],[],[],[],[],[]]
var len = 0;

function generatePixel(input) {
    arr = [[],[],[],[],[],[]]
    len = input.length;
    var line = 0;
    for (var i = 0; i < len; i++) { //for each word
        var word = JSON.parse("[" + words[input[i]] + "]")
        var get = word

        //find array and put into get
        for(var y = 0; y < 5; y++) {
            get[y].forEach(thi => {
                arr[y].push(thi + (line))
            })
        }
        if(get[5] == 3){
            line += 3
        } else if(get[5] == 5){
            line += 5
        } else if(get[5] == 0){
            line += 2
        } else if(get[5] == 1){
            line += 1;
        }
        else {line += 4}
        line++;
    }
    return arr
}


app.post('/api', (req, res) => {
    posting = req.body.inputText.toLowerCase()
    try{
        generatePixel(posting)
    } catch{
        generatePixel("error")
    }
    res.redirect('/')
})

app.get('/', async(req, res) => {
    var container = arr;
    res.render("index2", {pixel: container, length: len})
})


app.listen(3000)