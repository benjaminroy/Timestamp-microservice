var express = require('express');
var app = express();
var port = 8080;
//var m_naturalDate = "";
//var m_unixDate = "";

function dateIsValid(date){
    var months = ['January','February','Mars','April','May','June','July','August','September','October','November','December'];
    var dateArray = date.split(" ");
    
    var monthNum = months.indexOf(dateArray[0]) + 1;
    if(monthNum < 1){
        return -1;
    }
    
    console.log('Month: ' + monthNum);
    console.log('Day: '+ dateArray[1]);
    console.log('Year: '+ dateArray[2]);
    
    var naturalDate = dateArray[2] + '.' + monthNum + '.' + dateArray[1];
    return naturalDate;
}

function convertUnixToNaturalDate(unixDate){
    // Thanks to http://stackoverflow.com/questions/847185/convert-a-unix-timestamp-to-time-in-javascript for the solution:
    var date = new Date(unixDate * 1000);
    var months = ['January','February','Mars','April','May','June','July','August','September','October','November','December'];
    
    var year = date.getFullYear();
    var monthStr = months[date.getMonth()];
    var monthNum = date.getMonth();
    var day = date.getDate();
 
    var naturalDate = year + '.' + monthNum + '.' + day;
    return naturalDate;
}

function convertNaturalDateToUnix(naturalDate){
    var unixDate = new Date(naturalDate).getTime() / 1000; // '2012.08.10'
    return unixDate.toString();
}

app.all("*", function(req, res, next) {
  res.writeHead(200, { "Content-Type": "text/plain" });
  next();
});

app.get("/:datestring", function(req, res) {
    var date = req.params.datestring;

    // The string contains a natural language date
    if(isNaN(date)){
        
        console.log('The string contains a natural language date');
        var naturalDate = dateIsValid(date);
        var unixDate = convertNaturalDateToUnix(naturalDate);
        res.end(unixDate);
    }
    
    // The string contains a unix timestamp date
    else{  
        
        console.log('The string contains a unix timestamp date');
        var naturalDate = convertUnixToNaturalDate(date);
        var unixDate = date;
        res.end(naturalDate);
    }
    
});

app.get("/", function(req, res) {
    console.log('ERROR 404!');
    res.end("ERROR 404!");
});

app.listen(port, function(){
    console.log('App listening on port: ' + port );
});