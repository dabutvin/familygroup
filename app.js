var express = require('express');
var app = express();
var path = require('path');

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.use('/output', express.static(path.join(__dirname, 'output')))

app.listen(process.env.PORT || 3000);