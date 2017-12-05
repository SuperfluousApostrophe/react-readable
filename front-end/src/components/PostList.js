import React, {Component} from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../actions/actions';
//import FontAwesome from 'react-fontawesome';
import PostListItem from './PostListItem.js';

class PostList extends Component {
//   constructor(props) {
//      super(props);
//   }
   updateselectedCategory = function(){
      let catPath = this.props.ownProps.match.params.category;
      if(!catPath){catPath = 'all';}
      
      if(catPath!==this.props.globalSettings.selectedCat){
         this.props.selectCategory(catPath);
      }
   };
   componentWillMount(){
//         console.log(this.props);
         const {posts, match } = this.props;
//         console.log(match);
         const {postId, category} = match.params;
//         console.log(posts);
//         console.log(postId);
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
            rows.push(<div key="err" className=" col-sm-12 col-md-12 col-lg-12">Sorry, no posts available in the <span className="text-uppercase">{globalSettings.selectedCat}</span> category</div>);
         } else {
            for(let post of filteredPosts){
               rows.push(<PostListItem  key={post.id} post={post}/>); 
            }
         }
         return rows;
      }
      return(
         <div className="posts row col-sm-12 col-md-8 col-lg-10"> 
            <h2>Showing {currentCat} Posts</h2>
            <PostListItem/> 
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
//      fetchPosts: (data) => dispatch(fetchPosts(data)),
      selectCategory: (data) => dispatch(selectCategory(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList))
