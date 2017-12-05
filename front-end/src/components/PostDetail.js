import React, {Component} from 'react';
import {withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchCommentsForPost } from '../actions/actions';
import PostDetailBody from './PostDetailBody.js';

class PostDetail extends Component{
   setCurrentPost = function(postId){
//      console.log("setting current post");
      this.setState({currentPost:this.posts.filter(post => post.id === postId)[0]});
   }
   componentDidMount(){
//      console.log("component mounted");
//      console.log('postId',this.props.match.params.postId);
      this.props.fetchCommentsForPost({postId:this.props.match.params.postId});
   }
   render(){
      const postId = this.props.match.params.postId;
      const currentPost = this.props.posts.filter(post => post.id === postId)[0];
//      console.log(currentPost);
      return(
         <PostDetailBody currentPost={currentPost}/>
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
//     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
      fetchCommentsForPost:(data) => dispatch(fetchCommentsForPost(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))