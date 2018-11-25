require('dotenv').config();
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
var Dictionary = require("oxford-dictionary");
const app_id = process.env.appId;
const app_key = process.env.appKey ;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    const dict = new Dictionary(config);
    const lookup = dict.synonyms("stubborn");
    
    lookup.then(function(data) {
        res.send(data);

    },
    function(err) {
        console.log(err);
    });
    // res.json({
    //     'msg' :'welcome to wordlink application!'
    // });
});
app.get('/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    const dict = new Dictionary(config);
    const lookup = dict.antonyms(req.params.id);
    
    lookup.then(function(data) {
        res.send(data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms[0].id);

        console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms[0].id);

    },
    function(err) {
        console.log(err);
    });
});

app.get('/quote',(req,res)=>{
    const days = {
        monday:"serry : to crowd closely together.",
        tuesday:"waggish : roguish in merriment and good humor",
        wednesday:"doorbuster : a device used to forcibly open a door.",
        thursday:"thanksgiver : a person who gives thanks. ",
        friday:"cornucopia : an abundant, overflowing supply.",
        saturday :"sippet : a small piece of bread or the like for dipping in liquid food, as in gravy or milk; a small sop.",
        sunday :"gallinaceous : pertaining to or resembling the domestic fowls.",
        }
const d = new Date();
const n = d.getDay()
switch(n) {
    case 0 :
    res.send(days.monday)
    console.log(days.monday)
    break;

    case 1 :
    res.send(days.tuesday)
    console.log(days.tuesday)
    break;

    case 2 :
    res.send(days.wednesday)
    console.log(days.wednesday)
    break;

    case 3 :
    res.send(days.thursday)
    console.log(days.thursday)
    break;

    case 4 :
    console.log(days.friday)
    break;

    case 5 :
    res.send(days.saturday)
    console.log(days.saturday)
    break;

    case 6:
    res.send(days.sunday)
    console.log(days.sunday)
    break;

    default :
      console.log('Every day is a good day if you hustle...')
     
}
});
  
const wordRoutes = require('./routes/words');
app.use('/word',wordRoutes);

app.listen(port,()=>{
    console.log(`listening to server on ${port} port`);
    
})
module.exports = app;