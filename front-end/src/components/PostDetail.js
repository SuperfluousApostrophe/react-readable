import React, {Component} from 'react';
import { Route, Link, Location, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchSinglePost } from '../actions/actions';
class PostDetail extends Component{
    constructor(props) {
      super(props);
//      const {fetchSinglePost, match} = this.props;
//      console.log(this.props);
      this.state = {currentPost: {}};
   }
   
   componentWillMount(){
         console.log(this.props);
         const {posts, match } = this.props;
         console.log(match);
         const {postId, category} = match.params;
         console.log(posts);
         console.log(postId);
         this.setState({currentPost:posts.filter(post => post.id === postId)[0]});
         console.log(this.state.currentPost);
         
         
   }
   
   render(){
      const currentPost = this.state.currentPost;
      
      return(
         <div className="row postDetail col-sm-12 col-md-8 col-lg-10">
            <h2 className="row">{currentPost.title}</h2>
            <h4 className="row">[Created at {currentPost.timestamp} by {currentPost.author} in {currentPost.category}]</h4>
            <div className="row   col-sm-12 col-md-12 col-lg-12" >
               <div className="col-xs-1 col-sm-2 col-md-1 col-lg-1">{currentPost.voteScore}</div>
               <div className="postDetailBody col-xs-11 col-sm-10 col-md-11 col-lg-11">{currentPost.body}</div>
               <div className="row postDetailControls  col-sm-12 col-md-12 col-lg-12">
                  <div className="col-md-3 col-lg-3">Edit | Delete</div>
               </div>
            </div>
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
//      posts:state.post.items,
//      postsByCat: state.post.postsByCategory,
      globalSettings:state.globalStateSettings,
      ownProps: ownProps,
      posts: state.post.items,
      wholestore: state
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
//    editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostDetail))
