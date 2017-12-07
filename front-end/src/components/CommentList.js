import React, {Component} from 'react';
import { connect } from 'react-redux';
import CommentListItem from './CommentListItem.js';

class CommentList extends Component {
   render(){
      const {comments, currentPost} = this.props;
      
      function buildCommentRows(){
         let rows = [];
         if(Object.keys(comments).length>0){
            let commentsForPosts = comments[currentPost.id] || [];
               for(let comment of commentsForPosts){
                  rows.push(<CommentListItem  key={comment.id} comment={comment}/>); 
               }
            }
         return rows;
      }
      return(
         <div className="posts row col-sm-12 col-md-8 col-lg-10"> 
            { buildCommentRows() }
         </div>
      );
   };
};
/* This function is used to make the specific elements of the Redux Store 
 * needed in this component available for use within this component 
 * 
 */
function mapStateToProps (state, ownProps) {
   return {
      comments:state.comments,
      ownProps: ownProps
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
//      selectCategory: (data) => dispatch(selectCategory(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentList)
