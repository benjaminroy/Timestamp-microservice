var express = require('express');
var moment = require('moment');
var app = express();
var path    = require("path");
var port = 8080;
var m_Date = null;

app.use(express.static(__dirname));

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html')); // Render HTML File
});

app.get("/:datestring", function(req, res) {
    var date = req.params.datestring;

    // The string contains a natural language date
    if(isNaN(date)){
        
        console.log('The string contains a natural language date');
        m_Date = moment(date, 'MMMM D, YYYY');
    }
    
    // The string contains a unix timestamp date
    else{  
        
        console.log('The string contains a unix timestamp date');
        m_Date = moment(date, 'X');
    }
    
    if(m_Date.isValid()){
        res.json({
            unix: m_Date.format('X'),
            natural: m_Date.format('MMMM D, YYYY')
        }); 
    }
    else{
        res.json({
            unix: null,
            natural: null
        });   
    }
});

app.listen(port, function(){
    console.log('App listening on port: ' + port );
});