import React, {Component} from 'react';
import { connect } from 'react-redux';
//import {withRouter } from 'react-router-dom';
import {deleteItem, addComment } from '../actions/actions.js'

class CommentDialog extends Component{
   constructor(props){
      super(props);
      this.state = {
         isEdit:false,
         commentBody:'',
         commentAuthor:'',
         parentId:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   componentWillReceiveProps(){
//      console.log('Will Receive Props');
//      console.log(this.state, this.props);
//      this.setState({parentId:this.props.parentId});
//      var commentId = this.props.match.params.commentId;
////      console.log(commentId);
//      var currentPost = this.props.comments.filter(comment => comment.id === commentId)[0] || null;
////      console.log(currentPost);
//      if(currentPost){
//         this.setState({
//            isEdit:true,
//            commentTimestamp:currentPost.title,
//            commentAuthor:currentPost.author,
//            commentBody:currentPost.body,
//            commentCategory:currentPost.category,
//            parentId:''
//         });
//      } else {
//         this.setState({
//            isEdit:false,
//            commentTimestamp:'',
//            commentAuthor:'',
//            commentBody:'',
//            commentCategory:''
//         });
//      }
   }
   componentDidMount(){
//      console.log('component mounted');
//       console.log(this.props);
//      const commentId = this.props.match.params.commentId;
//      const currentPost = this.props.comments.filter(comment => comment.id === commentId)[0] || null;
////      console.log(currentPost);
//      if(currentPost){
//         this.setState({
//            isEdit:true,
//            commentTimestamp:currentPost.title,
//            commentAuthor:currentPost.author,
//            commentBody:currentPost.body,
//            commentCategory:currentPost.category,
//            parentId:'',
//         });
//      }
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
     const {addComment, editComment} = this.props;
     event.preventDefault();
//     console.log(this.state, this.props);
     if(this.state.isEdit){
        // send edit action
//         editPost({body:this.state.commentBody, id:'', parentId:''});
     } else {
        addComment({author:this.state.commentAuthor, body:this.state.commentBody, parentId:this.props.currentPost.id});
     }
   }
   deleteItem = function(commentId, type, e){
      e.preventDefault();
//      console.log(id, type);
      
//      if(type==='comment'){
//         this.props.delete({id:commentId,type});
//         this.props.history.push(`/`);
//      } else{
//         this.props.delete({id:item.id,type, parentId:item.parentId});
//      }
   }
   render(){
      const {categories, currentPost} = this.props;
//      var parentId = currentPost.id;
//      const commentId = this.props.match.params.commentId;
//      console.log(this.props);
      
      return(
         <div className="row commentSection col-sm-12 col-md-12 col-lg-12">
            <form onSubmit={this.handleSubmit}>
               <textarea name="commentBody" placeholder="Add a comment" 
                  className="col-sm-12 col-md-12 col-lg-12 commentEntry" 
                  value={this.state.commentBody} 
                  onChange={this.handleChange}></textarea>
               <div className="row col-md-12 col-lg-12 commentInputControls" >
                     <input  className="col-sm-12 col-md-6 col-lg-6 " name="commentAuthor" disabled={this.state.isEdit}  type="text" placeholder="Author Name" value={this.state.commentAuthor} onChange={this.handleChange}/>
                  <div className="btn-group col-sm-12 col-md-6 col-lg-6 pull-right text-right">
                  {this.state.isEdit===false 
                  ?  <div>
                        <button className="btn btn-primary">Submit</button> 
                        <button className="btn btn-info">Cancel</button> 
                     </div>
                  : <div>
                     <button className="btn btn-info">Save</button>
                     {/*<button className="btn btn-danger"  onClick={(e)=>this.deleteItem(commentId,'comment', e )}>Delete</button> */}
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
//      categories:state.categories.categories,
//      comments: state.comment.items,
   };
}
function mapDispatchToProps (dispatch) {
  return {
     addComment: (data) => dispatch(addComment(data)),
//      delete: (data) => dispatch(deleteItem(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDialog)