import React from 'react';

//don't need commas between methods--techinically not in an object
class AddNote extends React.Component{
  handleSubmit(){
    //save the value of this.note in var newNote
    //this.note.value grabs the value of the this.note from the setRef function
    //the setRef function grabs the ref value from the input field
    var newNote = this.note.value;
    //clear the value of this.note by passing empty string
    this.note.value = "";
    //pass newNote to the passed down function addNote
    this.props.addNote(newNote);
  }
  //passed specific ref from the input field and adds it as a property
  //NOTICE: using arrow function as alternative to .bind(this) pattern
  setRef(ref){
    this.note = ref;
  }

  //this.handleSubmit.bind(this) is because with ES6 class syntax, 'this' is not auto-bound
  //ensure that 'this' inside of the function context is bound correctly
  render(){
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Note" ref={(ref) => this.setRef(ref)} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleSubmit.bind(this)}>Submit</button>
        </span>
      </div>
    )
  }
}
//propTypes must be set as a property on a class using ES6 class syntax
AddNote.propTypes = {
  username: React.PropTypes.string.isRequired,
  addNote: React.PropTypes.func.isRequired
};

export default AddNote;
