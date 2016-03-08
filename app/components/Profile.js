import React from 'react';
import UserProfile from './Github/UserProfile';
import Repos from './Github/Repos';
import Notes from './Notes/Notes';
import getGithubInfo from '../utils/helpers';
import Rebase from 're-base';

//returns an object with helper methods to interface firebase with
const base = Rebase.createClass('https://intense-heat-9991.firebaseio.com/');

class Profile extends React.Component{
  //use constructor instead of getInitialState with ES6 classes
  constructor(props){
    //must call super and pass in props before using 'this' inside of a constructor
    super(props);
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }
  //component lifecycle event will be called as soon as the view is mounted
  componentDidMount(){
    //returns an object with firebase properties, and save it on 'this' instance under the ref property

    this.init(this.props.params.username);
  }
  componentWillReceiveProps(nextProps){
    //unbind firebase
    //pass it what's returned with you invoke bindToState
    base.removeBinding(this.ref);

    this.init(nextProps.params.username);
  }
  componentWillUnmount(){
    //unbind firebase
    //pass it what's returned with you invoke bindToState
    base.removeBinding(this.ref);
  }
  init(username){
    //whenever endpoint changes in firebase it will update the notes property on the state object
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    });

    //get github information and set bio and repos proerties
    getGithubInfo(username)
      .then(function(data){
        this.setState({
          bio: data.bio,
          repos: data.repos
        })
      }.bind(this));
  }
  //function to be passed down to child components to be invoked by them later on
  handleAddNote(newNote){
    // username/number of items in array and append a newNote to end of the firebase
    base.post(this.props.params.username, {
      data: this.state.notes.concat([newNote])
    });
  }
  render(){
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
            <Notes username={this.props.params.username} notes={this.state.notes} addNote={this.handleAddNote.bind(this)} />
          </div>
        </div>
      </div>
    )
  }
}

export default Profile;
