var React = require('react');

var UserProfile = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
  },
  render: function(){
    console.log(this.props.bio);
    return (
      <div>
        <p>USER PROFILE</p>
        <p>Username: {this.props.username.name}</p>
      </div>
    )
  }
});

module.exports = UserProfile;
