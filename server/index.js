var express = require('express');
var bodyParser = require('body-parser')
var request = require('request');
var Repo = require('../database')

var app = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static(__dirname + '/../client/dist'));

app.post('/repos/import', function (req, res) {
  // TODO
  var options = {
    url: `https://api.github.com/users/${req.body.term}/repos?access_token=1d12fd1bf7445cbb0a5004bfb20b29fc5604219c`,
    headers: {
      'User-Agent': 'dougecox'
    }
  }
  
  request.get(options, (err, response, body) => {
    
    var gitRepos = JSON.parse(response.body);

    gitRepos.forEach( (gitRepo) => {
      var repoItem = new Repo ({
        name: gitRepo.name,
        url: gitRepo.url,
        size: gitRepo.size,
        created_at: gitRepo.created_at
      });

      repoItem.save(function(err) {
        if (err) {
          console.log('error adding new list');
          console.log(err);
        } else {
          console.log('new list successfully saved'); 
        }
        });
      });

  });
  res.end();
});

app.get('/repos', function (req, res) {
  // TODO
  Repo.find()
  .limit(25)
  .sort('-created-at')
  .select('name size created_at')
  .exec((err,data) => {
    if(err) {
      console.log(err)
    }
    else {
      console.log('rep data send back to client');
      res.send(data);
    }
  })
});

var port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

