import React, {Component} from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import {editPost, addPost,deleteItem } from '../actions/actions.js'

class PostDialog extends Component{
   constructor(props){
      super(props);
      this.state = {
         isEdit:false,
         postTitle:'',
         postBody:'',
         postCategory:'',
         postAuthor:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
//      console.log(progps);
   }
   componentWillReceiveProps(nextProps){
      var postId = nextProps.match.params.postId;
      var currentPost = nextProps.posts.filter(post => post.id === postId)[0] || null;
      if(currentPost){
         this.setState({
            isEdit:true,
            postTitle:currentPost.title,
            postAuthor:currentPost.author,
            postBody:currentPost.body,
            postCategory:currentPost.category
         });
      } else {
         this.setState({
            isEdit:false,
            postTitle:'',
            postAuthor:'',
            postBody:'',
            postCategory:nextProps.categories.length>0?nextProps.categories[0].name:''
         });
      }
   }
   componentDidMount(){
      const postId = this.props.match.params.postId;
      const currentPost = this.props.posts.filter(post => post.id === postId)[0] || null;
      if(currentPost){
         this.setState({
            isEdit:true,
            postTitle:currentPost.title,
            postAuthor:currentPost.author,
            postBody:currentPost.body,
            postCategory:currentPost.category
         });
      }
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
     const {addPost, editPost} = this.props;
     event.preventDefault();
     if(this.state.isEdit){
        // send edit action
         let promise = editPost({title:this.state.postTitle, body:this.state.postBody, id:this.props.match.params.postId});
         promise.then(updatedPost => {
            this.props.history.push(`/${updatedPost.category}/${updatedPost.id}`);
         },()=>{
            //error
         });
     } else {
        let promise = addPost({author:this.state.postAuthor, title:this.state.postTitle, body:this.state.postBody, category:this.state.postCategory});
        promise.then(newPost => {
           this.props.history.push(`/${newPost.category}/${newPost.id}`);
        },()=>{
           //error
        });
     }
   }
   deleteItem = function(postId, type, e){
      e.preventDefault();
//      console.log(id, type);
      
//      if(type==='post'){
         this.props.delete({id:postId,type});
         this.props.history.push(`/`);
//      } else{
//         this.props.delete({id:item.id,type, parentId:item.parentId});
//      }
   }
   render(){
      const {categories} = this.props;
      const postId = this.props.match.params.postId;
//      console.log(postId);
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
                     <select  name="postCategory" disabled={this.state.isEdit} className="newPostCategory text-capitalize" value={this.state.postCategory} onChange={this.handleChange}>
                        {categories.map(category => (
                           <option key={category.path} value={category.name}>{category.name}</option>
                        ))}
                    </select>
                  </div>
                  <div className=" col-sm-12 col-md-4 col-lg-4 ">
                     <input name="postAuthor" disabled={this.state.isEdit}  type="text" placeholder="Author Name" value={this.state.postAuthor} onChange={this.handleChange}/>
                  </div>
                  <div className="btn-group col-sm-12 col-md-4 col-lg-4 pull-right text-right">
                  {this.state.isEdit===false 
                  ? <button className="btn btn-primary">Submit</button> 
                  : <div>
                     <button className="btn btn-info">Save</button>
                     <button className="btn btn-danger"  onClick={(e)=>this.deleteItem(postId,'post', e )}>Delete</button> 
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
      posts: state.post.items,
   };
}
function mapDispatchToProps (dispatch) {
  return {
//    createPost: (data) => dispatch(createPost(data)),
      editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
      addPost: (data) => dispatch(addPost(data)),
      delete: (data) => dispatch(deleteItem(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDialog))