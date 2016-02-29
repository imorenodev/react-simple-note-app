var React = require('react');
var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var Router = require('react-router');
var ReactFireMixin = require('reactfire');
var Firebase = require('firebase');

//component will manage user profile, repos, and notes components
var Profile = React.createClass({
  //Mixins take the 'this' instance and mixes in functionality adding on methods to use
  mixins: [ReactFireMixin],
  //method will set the initial state of the component
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {
        name: 'tyler'
      },
      repos: ['a', 'b', 'c']
    };
  },
  //component lifecycle event will be called as soon as the view is mounted
  componentDidMount: function(){
    //returns an object with firebase properties, and save it on 'this' instance under the ref property
    this.ref = new Firebase('https://intense-heat-9991.firebaseio.com/');
    //.child is a firebase property, take the root firebase url and grab the username from 'this' state
    var childRef = this.ref.child(this.props.params.username);
    //bindAsArray is a firebase method added to the 'this' instance
    //bindAsArray takes two arguments, a reference to the firebase, and a property on state to bind the firebase data to.
    this.bindAsArray(childRef, 'notes');
  },
  componentWillUnmount: function(){
    //calls reactfire method 'unbind' to remove the listener after the component moves on 
    this.unbind('notes');
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
            <Notes username={this.props.params.username} notes={this.state.notes} />
          </div>
        </div>
      </div>
    )
  }
});

module.exports = Profile;
