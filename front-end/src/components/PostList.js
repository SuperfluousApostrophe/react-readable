import React, {Component} from 'react';
import { Route, Link, Location, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchPosts, selectCategory } from '../actions/actions';
import FontAwesome from 'react-fontawesome';
import VoteControl from './VoteControl.js';

class PostList extends Component {
   constructor(props) {
      super(props);
//      this.updateselectedCategory();
   }
   updateselectedCategory = function(){
//      console.log(this.props);
      let catPath = this.props.ownProps.match.params.category;
      if(!catPath){catPath = 'all';}
//      console.log("cat path is ",catPath);
//      console.log("selected cat is ",this.props.globalSettings.selectedCat);
      
      if(catPath!==this.props.globalSettings.selectedCat){
//         console.log("changing selected category");
         this.props.selectCategory(catPath);
      }
   };
   componentWillMount(){
         console.log(this.props);
         const {posts, match } = this.props;
         console.log(match);
         const {postId, category} = match.params;
         console.log(posts);
         console.log(postId);
//         this.setState({currentPost:posts.filter(post => post.id === postId)[0]});
//         console.log(this.state.currentPost);
   }
   componentDidUpdate(){
      
//      console.log("component did update");
      this.updateselectedCategory();
   }
   render(){
      
      const {posts, postsByCat, globalSettings, ownProps, selectCategory, location} = this.props;
      let currentCat = globalSettings.selectedCat;
      
      let filteredPosts = [];
         //filter the posts based on the selected cat
         if(postsByCat.hasOwnProperty(globalSettings.selectedCat)){
            filteredPosts = posts.filter(post => postsByCat[globalSettings.selectedCat].indexOf(post.id) !== -1);
         } 
      
      function buildPostRows(){
         let rows = [];
         if(filteredPosts.length===0){
//            console.log("empty");
            rows.push(<div key="err" className=" col-sm-12 col-md-12 col-lg-12">Sorry, no posts available in the <span className="text-uppercase">{globalSettings.selectedCat}</span> category</div>);
         } else {
            for(let post of filteredPosts){
               let path = `/cat/${post.category}/post/${post.id}`;
               rows.push(
                  <div key={post.id} className="row col-sm-12 col-md-12 col-lg-12">
                  
                     <div className="voteScore col-sm-2 col-md-3"><VoteControl currentScore={post.voteScore} postId={post.id}/></div>
                     <div className="postCategory col-sm-2 col-md-2"> <Link to={path}>{post.category}</Link></div> 
                     <div className="postTitle col-sm-5 col-md-5"> <Link to={path}>{post.title} [{post.commentCount}]</Link></div>
                     <div className="postAuthor col-sm-3 col-md-2"> <Link to={path}>{post.author}</Link></div>
                  </div>
               ); 
            }
         }
//         console.log(rows);
         return rows;
      }
      return(
         <div className="posts row col-sm-12 col-md-8 col-lg-10"> 
                  <h2>Showing {currentCat} Posts</h2>
                  <div className="row col-sm-12 col-md-12 col-lg-12">
                     <div className="voteScore  col-sm-2 col-md-3">Score</div>
                     <div className="postCategory col-sm-2 col-md-2">Category</div> 
                     <div className="postTitle col-sm-5 col-md-5">Title</div>
                     <div className="postAuthor col-sm-3 col-md-2">Author</div>
                  </div>  
                  { buildPostRows() }
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
      posts:state.post.items,
      postsByCat: state.post.postsByCategory,
      globalSettings:state.globalStateSettings,
      ownProps: ownProps
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
      fetchPosts: (data) => dispatch(fetchPosts(data)),
      selectCategory: (data) => dispatch(selectCategory(data)),
//    createPost: (data) => dispatch(createPost(data)),
//    editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
