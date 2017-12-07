import React, {Component} from 'react';
//import { connect } from 'react-redux'
import VoteControl from './VoteControl.js';
import EditItemControl from './EditItemControl.js';
class CommentListItem extends Component{
   
   render(){
      const {comment} = this.props;
      const d = new Date(comment.timestamp);
      const commentDate = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} @ ${d.getHours()}: ${d.getMinutes()} `;
    
      return( 
         <div className="row col-sm-12 col-md-12 col-lg-12">
            <div className="row  col-sm-12 col-md-12 col-lg-12">
               <div className="voteScore col-sm-3 col-md-3 col-lg-3">
                  <VoteControl currentScore={comment.voteScore} voteType='comment' id={comment.id}/>
               </div>    
               <div>
                  Posted by {comment.author} on {commentDate}
               </div>
            </div>
            <div className="row  col-sm-12 col-md-12 col-lg-12">
              {comment.body}
            </div>
            <EditItemControl item={comment} controlType="comment"/>
         </div>
      );
   };
   
};
export default CommentListItem
   