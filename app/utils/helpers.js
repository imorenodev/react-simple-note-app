import axios from 'axios'; //ES6 syntax

function getRepos(username){
  return axios.get(`https://api.github.com/users/${username}/repos`);
}

function getUserInfo(username){
  return axios.get(`https://api.github.com/users/${username}`);
}

  //when we invoke helpers.getGithubInfo and pass in a username
  //we invoke axios.all and pass it an array of methods -promises-
  //when both promises resolve, both get their data back from github,
  //axios then passes back an object with the data assigned to
  //repos and bio properties on the object.
export default function getGithubInfo(username){
    return axios.all([getRepos(username), getUserInfo(username)])
      .then((arr) => ({repos: arr[0].data, bio: arr[1].data}))
}
