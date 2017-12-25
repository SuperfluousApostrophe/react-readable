import React, {Component} from 'react';
import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../actions/actions';
//import FontAwesome from 'react-fontawesome';
import PostListItem from './PostListItem.js';

class PostList extends Component {
   updateselectedCategory = function(){
      let catPath = this.props.ownProps.match.params.category;
      if(!catPath){catPath = 'all';}
      if(catPath!==this.props.globalSettings.selectedCat){
         this.props.selectCategory(catPath);
      }
   };
   componentDidUpdate(){
      this.updateselectedCategory();
   }
//   componentDidMount(){
//       this.updateselectedCategory();
//   }
   render(){
      
      const {posts, postsByCat, globalSettings} = this.props;
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
         <div className="posts"> 
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
