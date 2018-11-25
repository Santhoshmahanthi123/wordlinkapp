require('dotenv').config();
const https = require('https');
const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
const Dictionary = require('oxford-dictionary-api');
const app_id = process.env.appId;
const app_key = process.env.appKey ;
console.log(app_id);
console.log(app_key);
const dict = new Dictionary(app_id,app_key);

app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json({
        'msg' :'welcome to wordlink application!'
    });
});
dict.find("rainbow",function(error,data){
    if(error) return console.log(error);
    console.log(data);
  });
  
const wordRoutes = require('./routes/words');
app.use('/word',wordRoutes);

app.listen(port,()=>{
    console.log(`listening to server on ${port} port`);
    
})
module.exports = app;