var React = require('react');

var AddNote = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    addNote: React.PropTypes.func.isRequired
  },
  //passed specific ref from the input field and adds it as a property
  setRef: function(ref){
    this.note = ref;
  },
  handleSubmit: function(){
    //save the value of this.note in var newNote
    //this.note.value grabs the value of the this.note from the setRef function
    //the setRef function grabs the ref value from the input field
    var newNote = this.note.value;
    //clear the value of this.note by passing empty string
    this.note.value = "";
    //pass newNote to the passed down function addNote
    this.props.addNote(newNote);
  },
  render: function(){
    return (
      <div className="input-group">
        <input type="text" className="form-control" placeholder="Add New Note" ref={this.setRef} />
        <span className="input-group-btn">
          <button className="btn btn-default" type="button" onClick={this.handleSubmit}>Submit</button>
        </span>
      </div>
    )
  }
});

module.exports = AddNote;
