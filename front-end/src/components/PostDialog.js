import React, {Component} from 'react';
import { connect } from 'react-redux';
import {createPost, editPost, deletePost } from '../actions'

class PostDialog extends Component{
  
   render(){
      
      return(
         <div className="row newPostSection col-sm-12 col-md-8 col-lg-10">
            <input type="text" placeholder="Post Title" className="col-md-12 col-lg-12"/><br/><br/>
            <textarea placeholder="Post Body" className="col-md-12 col-lg-12"></textarea>
            <div className="col-md-12 col-lg-12">
               <label htmlFor="newPostCategory" >Post In</label>
               <select  className="newPostCategory">
                  <option value="react">React</option>
                  <option value="redux">Redux</option>
                  <option value="udacity">Udacity</option>
              </select>
              <button className="btn btn-primary">Submit</button>  
              <button className="btn btn-primary">Edit</button>
              <button className="btn btn-danger">Delete</button>
            </div>
         </div>
      );
   };
};
function mapStateToProps (state) {
   return {
      post: state.post,
      name:'Mike',
      categories:state.category,
   };
}
function mapDispatchToProps (dispatch) {
  return {
    createPost: (data) => dispatch(createPost(data)),
    editPost: (data) => dispatch(editPost(data)),
    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDialog)