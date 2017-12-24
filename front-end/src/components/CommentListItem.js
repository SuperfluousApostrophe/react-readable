import React, {Component} from 'react';
//import { connect } from 'react-redux'
import VoteControl from './VoteControl.js';
import EditItemControl from './EditItemControl.js';
import CommentDialog from './CommentDialog.js';

class CommentListItem extends Component{
    constructor(props){
      super(props);
      this.state = {
         isEdit:false
      };
   }
   editCommentBody = (isEdit) =>{
      this.setState({isEdit:isEdit});
   }
   render(){
      const {comment} = this.props;
      const d = new Date(comment.timestamp);
      const commentDate = d.toUTCString();//`${d.getMonth()}/${d.getDate()}/${d.getFullYear()} @ ${d.getHours()}:${d.getMinutes()} `;
    
      return( 
         <div className="row col-sm-12 col-md-12 col-lg-12">
               <div className="voteScore col-sm-3 col-md-3 col-lg-3">
                  <VoteControl currentScore={comment.voteScore} voteType='comment' id={comment.id}/>
                  <EditItemControl item={comment} controlType="comment" commentEditFunc={this.editCommentBody}/>
               </div>  
               {this.state.isEdit?
                  <div className="commentBody col-sm-9 col-md-9 col-lg-9">
                     <CommentDialog isEdit={this.state.isEdit} comment={comment} commentEditFunc={this.editCommentBody}/>
                  </div>
               :
                  <div className="commentBody col-sm-9 col-md-9 col-lg-9">
                     <p>{comment.body}</p>
                     <div className="row  commentPostedBy col-sm-12 col-md-12 col-lg-12 text-right">
                        Posted by {comment.author} on {commentDate}
                     </div>
                  </div>
               }
               
         </div>
      );
   };
   
};
export default CommentListItem
   