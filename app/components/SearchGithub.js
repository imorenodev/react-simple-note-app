import React from 'react';
import Router from 'react-router';

class SearchGithub extends React.Component{
  getRef(ref){
    this.usernameRef = ref;
  }
  handleSubmit(){
    const username = this.usernameRef.value;
    this.usernameRef.value = "";
    //can't use mixins using ES6 class pattern, passing down history through props from main
    //main has access to history prop because it's being controlled by the router.
    //pushState allows us to transition to a new route
    this.props.pushState(null, "/profile/" + username);
  }
  render(){
    return (
      <div className="col-sm-12">
        <form onSubmit={this.handleSubmit.bind(this)}>
          <div className="form-group col-sm-7">
            <input type="text" className="form-control" ref={(ref) => this.getRef(ref)} />
          </div>
          <div className="form-group col-sm-5">
            <button type="submit" className="btn btn-block btn-primary">Search Github</button>
          </div>
        </form>
      </div>
    )
  }
}

SearchGithub.propTypes = {
  history: React.PropTypes.object.isRequired
}

export default SearchGithub;
