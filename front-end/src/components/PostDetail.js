import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchCommentsForPost } from '../actions/actions';
import PostDetailBody from './PostDetailBody.js';
import CommentList from './CommentList.js';

class PostDetail extends Component{
   componentDidMount(){
      this.props.fetchCommentsForPost({postId:this.props.match.params.postId});
   }
   componentDidReceiveProps(){
      if(this.props.posts.filter(post => post.id === this.props.match.params.postId).length!==1){
         console.log("postobj does not exist. Redirect!");
        this.props.history.push('/');
      }
   }
   render(){
      const postId = this.props.match.params.postId;
      const currentPost = this.props.posts.filter(post => post.id === postId)[0] || {};
      
      return(
         <div>
            <PostDetailBody currentPost={currentPost}/>
            {<CommentList currentPost={currentPost} />}
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
      posts: state.post.items,
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
      fetchCommentsForPost:(data) => dispatch(fetchCommentsForPost(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))