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
app.get('/dicsyn/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    const dict = new Dictionary(config);
    const lookup = dict.synonyms(req.params.id);
    
    lookup.then(function(data) {
        res.send(data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms[0].id);
        console.log(data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms[0].id);

    },
    function(err) {
        console.log(err);
    });
   
});
app.get('/dicant/:id',(req,res)=>{
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

    var days = {
        monday:`word of the day is "serry" : "to crowd closely together."`,
        tuesday:`word of the day is "waggish" : "roguish in merriment and good humor." `,
        wednesday:`word of the day is "doorbuster" : "a device used to forcibly open a door."`,
        thursday:`word of the day is "thanksgiver" : "a person who gives thanks."`,
        friday:`word of the day is "cornucopia" : "an abundant, overflowing supply."`,
        saturday :`word of the day is "sippet" : "a small piece of bread or the like for dipping in liquid food, as in gravy or milk; a small sop."`,
        sunday :`word of the day is "gallinaceous" : "pertaining to or resembling the domestic fowls."`,
        }
var d = new Date();
var n = d.getDay()
switch(n) {
    case 0 :
    console.log(days.monday)
    break;

    case 1 :
    console.log(days.tuesday)
    break;

    case 2 :
    console.log(days.wednesday)
    break;

    case 3 :
    console.log(days.thursday)
    break;

    case 4 :
    console.log(days.friday)
    break;

    case 5 :
    console.log(days.saturday)
    break;

    case 6:
    console.log(days.sunday)
    break;

    default :
      console.log('Every day is a good day if you hustle...')
     
}
app.listen(port,()=>{
    console.log(`listening to server on ${port} port`);
    
});
module.exports = app;