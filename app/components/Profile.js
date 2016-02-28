var React = require('react');
var Router = require('react-router');

var Profile = React.createClass({
  //method will set the initial state of the component
  getInitialState: function(){
    return {
      notes: [],
      bio: {},
      repos: []
    };
  },

  render: function(){
    return (
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            User Profile Component
          </div>
          <div className="col-md-4">
            Repos Component
          </div>
          <div className="col-md-4">
            Notes Component
          </div>
        </div>
      </div>
    )
  }
})

module.exports = Profile;
