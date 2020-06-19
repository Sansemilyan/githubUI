var http = require('http');
var fs = require('fs');
var path = require('path');
//var express = require('express');
var port=3000; 

console.log('starting server...');
var server = http.createServer(function (req, res) {
    if (req.url!='/favicon.ico'){
        if (req.url.endsWith('.css')){
            console.log('css loading');
            var cssFile = 'public'+req.url;
            fs.readFile(cssFile,'utf8',(err, data)=>{
                if (err) throw err;
    
                res.setHeader("Content-Type", 'text/css');
                //res.statusCode = 200;
                res.write(data);
                res.end();
            })
        } else{
            console.log('html loading');
            console.log(req.url);
            getPage(req.url, res);
        }}
})

function getPage (name, res, statusCode=200){
    if (name == '/'){
        name = 'index'
    }
    fs.readFile('public/'+name+'.html','utf8',(err,data)=>{
        res.setHeader("Content-Type", 'text/html');
            //res.statusCode = 200;
            res.write(data);
            res.end();
    })
}


server.listen(port, (err) => {
    if (err) {
        console.log(`Error: ${err}`)
    } else {
        console.log(`Server listening at port ${port}...`);
    }
});


 