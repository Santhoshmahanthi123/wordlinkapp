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
app.get('/dicdef/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    var dict = new Dictionary(config);
    var def = dict.definitions(req.params.id);
    
    def.then((data)=> {
        res.send(data);
        const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        console.log(`The definition of the word "${req.params.id}" is "${definition}"`);

    },
  
    function(err) {
        console.log(err);
    });
   
});
app.get('/dicsyn/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    var dict = new Dictionary(config);
    var syn = dict.synonyms(req.params.id);
    
    syn.then((data) =>{
        res.send(data);
        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms;
        for(let i=0;i<synonyms.length;i++) {
            console.log(`The synonyms of  the word "${req.params.id}" are "${synonyms[i].text}`);
        }

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
    
    var dict = new Dictionary(config);
    var ant = dict.antonyms(req.params.id);
    
    ant.then((data)=> {
        res.send(data);
        const antonym = data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
        for(let i=0;i<antonym.length;i++)
        {
         console.log(`The antonym of the word "${req.params.id}" is "${antonym[i].text}"`);

        }

    },
    function(err) {
        console.log(err);
    });
});


app.get('/dicex/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
      var dict = new Dictionary(config);
      var ex = dict.examples(req.params.id);
     ex.then((data)=> {
        res.send(data)
        const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
        for(let i=0;i<example.length;i++)
        {
            console.log(`The example of the word "${req.params.id}" is "${example[i].text}"`)

        }
    },
    function(err) {
        console.log(err);
    });
});
app.get('/dict/:id',(req,res)=>{
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
      var dict = new Dictionary(config);
      var syno = dict.synonyms(req.params.id);
      var anto = dict.antonyms(req.params.id);
      var defi = dict.definitions(req.params.id);
      var exp  = dict.examples(req.params.id);
     syno.then((data)=> {
        anto.then((data)=> {
            defi.then((data)=>{
                exp.then((data)=>{
                    const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
                    for(let i=0;i<example.length;i++)
                    {
                        console.log(`The example of the word "${req.params.id}" is "${example[i].text}"`)
            
                    }

                })
                const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                console.log(`The definition of the word "${req.params.id}" is "${definition}"`);
        
            });
            // res.send(data)
    
            const antonym = data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
            for(let i=0;i<antonym.length;i++)
            {
             console.log(`The antonym of the word "${req.params.id}" is "${antonym[i].text}"`);
    
            }
    
        },
        function(err) {
            console.log(err);
        });
        res.send(data)

        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms;
        for(let i=0;i<synonyms.length;i++) {
            console.log(`The synonyms of  the word "${req.params.id}" are "${synonyms[i].text}`);
        }

    },
    function(err) {
        console.log(err);
    });
});
app.get('/',(req,res)=>{
    //for word of the day i used dummy data since i am using oxford dictionary api i wont get word of the day in this api
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
    case 1 :
    res.send(days.monday)
    console.log(days.monday)
    break;

    case 2 :
    res.send(days.tuesday)
    console.log(days.tuesday)
    break;

    case 3 :
    res.send(days.wednesday)
    console.log(days.wednesday)
    break;

    case 4 :
    res.send(days.thursday)
    console.log(days.thursday)
    break;

    case 5 :
    res.send(days.friday)
    console.log(days.friday)
    break;

    case 6 :
    res.send(days.saturday)
    console.log(days.saturday)
    break;

    case 0:
    res.send(days.sunday)
    console.log(days.sunday)
    break;

    default :
      console.log('Every day is a good day if you hustle...')
     
}
});
app.listen(port,()=>{
    console.log(`listening to server on ${port} port`);
    
});
module.exports = app;