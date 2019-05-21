const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
var Sentiment = require('sentiment');
var sentiment = new Sentiment();

var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/index'));

app.use(bodyParser.urlencoded({
   extended: false
}));

app.use(bodyParser.json());

app.get('/', function(req, res){
  
  res.sendFile(__dirname + '/index.html'); //if html file is root directory
 
});

app.post('/solve', function(req,res){
	let text = req.body.textField;
	let result = sentiment.analyze(text);
	//res.writeHeader(200, {"Content-Type": "text/html"});
	res.json(result.score)
	console.log(result.score)
})


app.use('/', router);
app.listen(process.env.port || 3000);

console.log('Running at Port 3000');