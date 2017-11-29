import React, {Component} from 'react';
import { connect } from 'react-redux';
//import {createPost, editPost, deletePost } from '../actions'

class PostDialog extends Component{
   state = {
      isEdit:true
   }
   render(){
      const {categories} = this.props;
      
      return(
         <div className="row newPostSection col-sm-12 col-md-8 col-lg-10">
            <input type="text" placeholder="Post Title" className="col-md-12 col-lg-12"/><br/><br/>
            <textarea placeholder="Post Body" className="col-md-12 col-lg-12 postEntry"></textarea>
            <div className="col-md-12 col-lg-12">
               <div className=" col-sm-12 col-md-3 col-lg-2 ">
                  <label htmlFor="newPostCategory" >Post In &nbsp;</label>
                  <select  className="newPostCategory" className="text-capitalize" >
                     {categories.map(category => (
                        <option key={category.path} value={category.name}>{category.name}</option>
                     ))}
                 </select>
               </div>
              <div className="btn-group col-sm-12 col-md-9 col-lg-10 pull-right">
               {this.state.isEdit===false 
               ? <button className="btn btn-primary">Submit</button> 
               : <div>
                  <button className="btn btn-info">Save</button>
                  <button className="btn btn-danger">Delete</button> 
               </div>
               }
               </div>
            </div>
         </div>
      );
   };
};
function mapStateToProps (state) {
   return {
      categories:state.categories.categories,
   };
}
function mapDispatchToProps (dispatch) {
  return {
//    createPost: (data) => dispatch(createPost(data)),
//    editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDialog)