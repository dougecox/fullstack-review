var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

var repoSchema = mongoose.Schema({
  // TODO: your schema here!
  name: String,
  url: String,
  size: Number,
  stargazers_count: Number,
  watchers_count: Number,
  forks_count: Number,
  created_at: String,
  
});

var Repo = mongoose.model('Repo', repoSchema);

module.exports = Repo;

// gitRepos.forEach( (gitRepo) => {
    //   var repoItem = new Repo ({
    //     name: gitRepo.name,
    //     url: gitRepo.url,
    //     size: gitRepo.size,
    //     created_at: gitRepo.created_at
    //   });

    //   repoItem.save(function(err) {
    //     if (err) {
    //       console.log('error adding new list');
    //       console.log(err);
    //     } else {
    //       console.log('new list successfully saved'); 
    //     }
    //     });
    //   });