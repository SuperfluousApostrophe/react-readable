import React, {Component} from 'react';
import { Route, Link, Location, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {fetchPosts, selectCategory } from '../actions/actions';

class PostRow extends Component {
   
   
   render(){
      
      const {posts, postsByCat, globalSettings, ownProps, selectCategory} = this.props;
      console.log(ownProps.match.params.category);
      let catPath = ownProps.match.params.category;
      if(!catPath){catPath = 'all';}
      console.log("cat path is ",catPath);
      if(catPath!==globalSettings.selectedCat){
         selectCategory(catPath);
      }
      
      let currentCat = globalSettings.selectedCat;
//      console.log(globalSettings.selectedCat);
//      console.log(postsByCat);
//      console.log(posts);
      
      let filteredPosts = [];
         //filter the posts based on the selected cat
         if(postsByCat.hasOwnProperty(globalSettings.selectedCat)){
            filteredPosts = posts.filter(post => postsByCat[globalSettings.selectedCat].indexOf(post.id) !== -1);
         } 
//      console.log(filteredPosts);
      
      function buildPostRows(){
         let rows = [];
         if(filteredPosts.length===0){
//            console.log("empty");
            rows.push(<div key="err" className=" col-sm-12 col-md-12 col-lg-12">Sorry, no posts available in the <span className="text-uppercase">{globalSettings.selectedCat}</span> category</div>);
         } else {
            for(let post of filteredPosts){
               rows.push(<div key={post.id} className="row col-sm-12 col-md-12 col-lg-12">
                  <div className="voteScore col-sm-1">{post.voteScore}</div>   
                  <div className="postCategory col-sm-2">{post.category}</div> 
                  <div className="postTitle col-sm-9">{post.title}</div>
               </div>); 
            }
         }
//         console.log(rows);
         return rows;
      }
      return(
         <div className="posts"> 
            <Route path='/' render={ ()=>(
               <div className="row col-sm-12 col-md-8 col-lg-10">
                  <h2>Showing {currentCat} Posts</h2>
                  <div className="row col-sm-12 col-md-12 col-lg-12">
                     <div className="voteScore col-sm-1">Score</div>
                     <div className="postCategory col-sm-2">Category</div> 
                     <div className="postTitle col-sm-6">Title</div>
                     <div className="postTitle col-sm-3">Author</div>
                  </div>  
                  { buildPostRows() }
               </div>
             )} />
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
)(PostRow))
