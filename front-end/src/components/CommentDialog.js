import React, {Component} from 'react';
import { connect } from 'react-redux';
import {addComment, editComment } from '../actions/actions.js'

class CommentDialog extends Component{
   constructor(props){
      super(props);
      this.state = {
         isEdit:false,
         commentBody:'',
         commentAuthor:'',
         parentId:'',
         commentId:'',
      };
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleChange = this.handleChange.bind(this);
   }
   componentDidMount(){
      if(this.props.hasOwnProperty('isEdit')){
         this.setState(
            {isEdit:this.props.isEdit, 
            commentBody:this.props.comment.body,
            commentId:this.props.comment.id,
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
     const {addComment, editComment} = this.props;
     event.preventDefault();
     if(this.state.isEdit){
        // send edit action
         editComment({body:this.state.commentBody, id:this.state.commentId});
         this.props.commentEditFunc(false);
         this.clearState();
     } else {
        if(this.state.commentBody){
            addComment({author:this.state.commentAuthor, body:this.state.commentBody, parentId:this.props.currentPost.id});
            this.clearState();
         }
     }
   }
   clearState(){
      this.setState({
         isEdit:false,
         commentBody:'',
         commentAuthor:'',
         parentId:'',
         commentId:'',
      });
   }
   editCancel(e){
      e.preventDefault();
      this.clearState();
      this.props.commentEditFunc(false);
   }
   addCancel(e){
      e.preventDefault();
      this.clearState(); 
   }
   render(){
      return(
         <div className="row commentSection col-sm-12 col-md-12 col-lg-12">
            <form onSubmit={this.handleSubmit}>
               <textarea name="commentBody" placeholder="Add a comment" 
                  className="col-sm-12 col-md-12 col-lg-12 commentEntry" 
                  value={this.state.commentBody} 
                  onChange={this.handleChange}></textarea>
               <div className="row col-md-12 col-lg-12 commentInputControls" >
                  {this.state.isEdit===false?
                     <input  className="col-sm-12 col-md-6 col-lg-6 " name="commentAuthor"  type="text" placeholder="Author Name" value={this.state.commentAuthor} onChange={this.handleChange}/>
                  :
                     ''
                  }
                  {this.state.isEdit===false 
                  ?  <div  className="btn-group col-sm-12 col-md-6 col-lg-6 pull-right text-right">
                        <button className="btn btn-primary">Submit</button> 
                        <button className="btn btn-info"  onClick={(e)=>this.addCancel(e)}>Cancel</button> 
                     </div>
                  : <div className="btn-group col-sm-12 col-md-12 col-lg-12 pull-right text-right">
                     <button className="btn btn-info">Save</button>
                     <button className="btn btn-info" onClick={(e)=>this.editCancel(e)}>Cancel</button> 
                  </div>
                  }
               </div>
            </form>
         </div>
      );
   };
};
function mapStateToProps (state) {
   return {
   };
}
function mapDispatchToProps (dispatch) {
  return {
     addComment: (data) => dispatch(addComment(data)),
     editComment: (data) => dispatch(editComment(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDialog)