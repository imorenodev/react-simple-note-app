var React = require('react');
var UserProfile = require('./Github/UserProfile');
var Repos = require('./Github/Repos');
var Notes = require('./Notes/Notes');
var Router = require('react-router');

//component will manage user profile, repos, and notes components
var Profile = React.createClass({
  //method will set the initial state of the component
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {
        name: 'Ian'
      },
      repos: ['a', 'b', 'c']
    };
  },

  render: function(){
    console.log(this.props)
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <UserProfile username={this.props.params.username} bio={this.state.bio} />
          </div>
          <div className="col-md-4">
            <Repos repos={this.state.repos} />
          </div>
          <div className="col-md-4">
            <Notes notes={this.state.notes} />
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Profile;
