import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import VoteControl from './VoteControl.js';

import {Link} from 'react-router-dom';

class PostListItem extends Component{
   
   render(){
      const {post, isHeader} = this.props;
//      console.log(currentPost);
      
      const makeRow = function(post){
         let rowData = {
           voteScore:"Score", 
           category: "Category",
           title: "Title",
           author: "Author"
        };
        
         if(post){
            let path = `/cat/${post.category}/post/${post.id}`;
            rowData.voteScore = <VoteControl currentScore={post.voteScore} postId={post.id}/>;
            rowData.category =  <Link to={path}>{post.category}</Link>;
            rowData.title =  <Link to={path}>{post.title} [{post.commentCount}]</Link>;
            rowData.author =  <Link to={path}>{post.author}</Link>;
         } 
         
         
         let row  = <div className="row col-sm-12 col-md-12 col-lg-12">
               <div className="voteScore col-sm-2 col-md-3">{rowData.voteScore}</div>
               <div className="postCategory col-sm-2 col-md-2">{rowData.category}</div> 
               <div className="postTitle col-sm-5 col-md-5">{rowData.title}</div>
               <div className="postAuthor col-sm-3 col-md-2">{rowData.author}</div>
            </div>
         
         return row;
      };
      return( 
         makeRow(post)
      );
   };
   
};
/* This function is used to make the specific elements of the Redux Store 
 * needed in this component available for use within this component 
 * 
 */
function mapStateToProps (state, ownProps) {
   return {
//      posts: state.post.items,
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
//     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListItem)
   