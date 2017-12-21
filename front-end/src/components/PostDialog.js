import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import {addPost } from '../actions/actions.js'

class PostDialog extends Component{
   constructor(){
      super();
      this.state = {
         isEdit:false,
         postTitle:'',
         postBody:'',
         postCategory:'',
         postAuthor:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   
   handleChange(event){
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
      this.setState({
         [name]: value
    });
   }
   handleSubmit(event) {
     const addPost = this.props.addPost;
     event.preventDefault();
     if(this.state.isEdit){
        // send edit action
     } else {
        let promise = addPost({author:this.state.postAuthor, title:this.state.postTitle, body:this.state.postBody, category:this.state.postCategory});
        promise.then(newPost => {
           this.props.history.push(`/cat/${newPost.category}/post/${newPost.id}`);
        },()=>{
           //error
        });
     }
   }
   createPost = function(){
      
   }
   render(){
      const {categories} = this.props;
      const postId = this.props.match.params.postId;
      
      return(
         <div className="row newPostSection col-sm-12 col-md-12 col-lg-12">
            {this.state.isEdit
            ?<h2>Edit Post</h2>
            :<h2>Add a Post!</h2>}
            <form onSubmit={this.handleSubmit}>
               <input name="postTitle" type="text" placeholder="Post Title" className="col-md-12 col-lg-12" value={this.state.postTitle} onChange={this.handleChange}/><br/><br/>
               <textarea name="postBody" placeholder="Post Body" className="col-md-12 col-lg-12 postEntry" value={this.state.postBody} onChange={this.handleChange}></textarea>
               <div className="row col-md-12 col-lg-12">
                  <div className=" col-sm-12 col-md-4 col-lg-4 ">
                     <label htmlFor="newPostCategory" >Post In &nbsp;</label>
                     <select  name="postCategory" className="newPostCategory" className="text-capitalize" value={this.state.postCategory} onChange={this.handleChange}>
                        {categories.map(category => (
                           <option key={category.path} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className=" col-sm-12 col-md-4 col-lg-4 ">
                     <input name="postAuthor" type="text" placeholder="Author Name" value={this.state.postAuthor} onChange={this.handleChange}/>
                  </div>
                  <div className="btn-group col-sm-12 col-md-4 col-lg-4 pull-right text-right">
                  {this.state.isEdit===false 
                  ? <button className="btn btn-primary">Submit</button> 
                  : <div>
                     <button className="btn btn-info">Save</button>
                     <button className="btn btn-danger">Delete</button> 
                  </div>
                  }
                  </div>
               </div>
            </form>
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
      addPost: (data) => dispatch(addPost(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDialog)