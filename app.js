const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const cors = require('cors');
const port = process.env.PORT || 8080;
const app = express();
app.use(logger('dev'));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());
app.use(cors());
app.get('/',(req,res)=>{
    res.json({
        'msg' :'welcome to wordlink application!'
    })
})
app.listen(port,()=>{
    console.log(`listening to server on ${port} port`);
    
})
module.exports = app;