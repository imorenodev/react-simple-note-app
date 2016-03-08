var React = require('react');
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');
import getGithubInfo from '../utils/helpers';

//component will manage user profile, repos, and notes components
var Profile = React.createClass({
  //Mixins take the 'this' instance and mixes in functionality adding on methods to use
  mixins: [ReactFireMixin],
  //method will set the initial state of the component
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {},
      repos: []
    };
  },
  //component lifecycle event will be called as soon as the view is mounted
  componentDidMount: function(){
    //returns an object with firebase properties, and save it on 'this' instance under the ref property
    this.ref = new Firebase('https://intense-heat-9991.firebaseio.com/');
    this.init(this.props.params.username);
  },
  componentWillReceiveProps: function(nextProps){
    this.unbind('notes');
    this.init(nextProps.params.username);
  },
  componentWillUnmount: function(){
    //calls reactfire method 'unbind' to remove the listener after the component moves on
    this.unbind('notes');
  },
  init: function(username){
    //.child is a firebase property, take the root firebase url and grab the username from 'this' state
    var childRef = this.ref.child(username);
    //bindAsArray is a firebase method added to the 'this' instance
    //bindAsArray takes two arguments, a reference to the firebase, and a property on state to bind the firebase data to.
    this.bindAsArray(childRef, 'notes');

    //get github information and set bio and repos proerties
    getGithubInfo(username)
      .then(function(data){
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this));
  },
  //function to be passed down to child components to be invoked by them later on
  handleAddNote: function(newNote){
    // username/number of items in array and append a newNote to end of the firebase
    this.ref.child(this.props.params.username).child(this.state.notes.length).set(newNote);
  },

  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <UserProfile username={this.props.params.username} bio={this.state.bio} />
          </div>
          <div className="col-md-4">
            <Repos username={this.props.params.username} repos={this.state.repos} />
          </div>
          <div className="col-md-4">
            <Notes username={this.props.params.username} notes={this.state.notes} addNote={this.handleAddNote} />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
