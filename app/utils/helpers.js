var axios = require('axios');

function getRepos(username){
  return axios.get("https://api.github.com/users/" + username + "/repos");
};

function getUserInfo(username){
  return axios.get("https://api.github.com/users/" + username);
};

var helpers = {
  //when we invoke helpers.getGithubInfo and pass in a username
  //we invoke axios.all and pass it an array of methods -promises-
  //when both promises resolve, both get their data back from github,
  //axios then passes back an object with the data assigned to
  //repos and bio properties on the object.
  getGithubInfo: function(username){
    return axios.all([getRepos(username), getUserInfo(username)])
    .then(function(arr){
      return {
        repos: arr[0].data,
        bio: arr[1].data
      };
    });
  }
};

module.exports = helpers;
