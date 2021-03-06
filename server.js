var express = require('express');
var path = require('path');
var app = express();
//App  port
var port = process.env.PORT || 8855;

//morgan logt alle requests
var morgan = require('morgan');
app.use(morgan('dev'));
//Middleware für Mongo Database
var mongoose = require('mongoose');

//Cross Origin
var cors = require('cors');
app.use(cors());

//Body Parser
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // zum parsen son JSON Daten
app.use(bodyParser.urlencoded({ extended: true}));

//Der Applikation zugriff auf Verzeichnisse geben
app.use(express.static(__dirname + '/public'));

//API Router DB Funtionen Ausführen
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
app.use('/api', appRoutes);

app.get('*', function(req,res){
  res.sendFile(path.join(__dirname + '/public/index.html'));
});

//Starte Server
app.listen(port, function(){
  console.log('Server runnting on port ' + port);
});
