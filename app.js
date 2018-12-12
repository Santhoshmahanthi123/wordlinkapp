require('dotenv').config();
const https = require('https');
// const ejs = require('ejs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//readline used to read the data from the terminal
const readline = require('readline-sync');
const port = process.env.PORT || 8080;
const app = express();
const Dictionary = require("oxford-dictionary");
const app_id = process.env.appId;
const app_key = process.env.appKey ;
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
// app.use('ejs');
app.set('view engine','ejs');
app.get('/check',(req,res)=>{
    const name = readline.question("What is your name?");

    console.log("Hi " + name + ", nice to meet you.");
});
app.get('/game',(req,res)=>{
    res.render('game')
});
app.post('/game',(req,res)=>{
    // res.render('game');
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };    
    
    var dict = new Dictionary(config);
    var syn = dict.synonyms(req.body.word.name);
    
    syn.then((data) =>{
        if(data){
            res.send(`word found!`);

        }

        // else{
        //     res.send('word not found!');

        // }
       
        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms;
        // console.log(synonyms)
        for(let i=0;i<synonyms.length;i++) {
            // res.send('word found!')

            console.log(`The synonyms of  the word "${req.body.word.name}" are "${synonyms[i].text}"    `);
            const syn = synonyms[i].text;
            // console.log(syn);
            // req.body.word.name==syn ?(res.send('word is found')) : (res.send('not found'));

            // if(req.params.id==syn)
            // {
            //     console.log("correct!")
            // }
        }
    })
    .catch((err)=>{
        res.send('The word you are searching for is not found!')
        console.log(err);
    });
});
//route for definition of the word

app.get('/dicdef',(req,res)=>{
    const word = readline.question("Enter a word which you want to know the definition");
    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    var dict = new Dictionary(config);
    var def = dict.definitions(word);
    
    def.then((data)=> {
        res.send(data);
        const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
        console.log("The definition of the word " +word+ " is ");
        console.log(definition)

    })
    .catch((err)=>{
        console.log(err);
    });
   
});
//route for synonyms of the word
app.get('/dicsyn',(req,res)=>{
    res.send
    const word = readline.question("Enter a word which you want to know the synonym");

    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    var dict = new Dictionary(config);
    var syn = dict.synonyms(word);
    
    syn.then((data) =>{
        res.send(data);
        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms;
        for(let i=0;i<synonyms.length;i++) { 
            console.log("The synonyms of the word " +word+ " is " +synonyms[i].text);
        }
        
      

    })
    .catch((err)=>{
        console.log(err);
    });
   
});

//route for antonyms of the word
app.get('/dicant',(req,res)=>{
    const word = readline.question("Enter a word which you want to know the antonym");

    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
    
    var dict = new Dictionary(config);
    var ant = dict.antonyms(word);
    
    ant.then((data)=> {
        res.send(data);
        const antonym = data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
        for(let i=0;i<antonym.length;i++)
        {
            console.log("The antonyms of the word " +word+ " is " +antonym[i].text);

        }

    })
    .catch((err)=>{
        console.log(err);
    });
});

//route for examples of the word
app.get('/dicex',(req,res)=>{
    const word = readline.question("Enter a word which you want to know the example");

    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
      var dict = new Dictionary(config);
      var ex = dict.examples(word);
     ex.then((data)=> {
        res.send(data)
        const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
        for(let i=0;i<example.length;i++)
        {
            console.log("The examples of the word " +word+ " is " +example[i].text);

        }
    })
    .catch((err)=>{
        console.log(err);
    });
});

//route for synonyms,antonyms,examples,definition of the word
app.get('/dict',(req,res)=>{
    const word = readline.question("Enter a word which you want to know all details");

    var config = {
        app_id : process.env.appId,
        app_key : process.env.appKey,
        source_lang : "en"
      };
      var dict = new Dictionary(config);
      var syno = dict.synonyms(word);
      var anto = dict.antonyms(word);
      var defi = dict.definitions(word);
      var exp  = dict.examples(word);
     syno.then((data)=> {
        anto.then((data)=> {
            defi.then((data)=>{
                exp.then((data)=>{
                    const example = data.results[0].lexicalEntries[0].entries[0].senses[0].examples;
                    for(let i=0;i<example.length;i++)
                    {
                        console.log("The examples of the word " +word+ " is " );
                        console.log(example[i].text)
            
                    }

                })
                .catch((err)=>{
                    console.log(err);
                })
                const definition = data.results[0].lexicalEntries[0].entries[0].senses[0].definitions[0];
                console.log("The definition of the word " +word+ " is ");
                console.log(definition);        
            })
            .catch((err)=>{
                console.log(err);
            });
            
    
            const antonym = data.results[0].lexicalEntries[0].entries[0].senses[0].antonyms;
            for(let i=0;i<antonym.length;i++)
            {
                console.log("The antonyms of the word " +word+ " is " );
                console.log(antonym[i].text)
    
            }
    
        })
        .catch((err)=>{
            console.log(err);
        });
        res.send(data)

        const synonyms = data.results[0].lexicalEntries[0].entries[0].senses[0].subsenses[0].synonyms;
        for(let i=0;i<synonyms.length;i++) {
            console.log("The synonyms of the word " +word+ " is ");
            console.log(synonyms[i].text);
        }

    })
    .catch((err)=>{
        console.log(err);
    });
});

//home route for word of the day
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