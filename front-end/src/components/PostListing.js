import React, {Component} from 'react';
//import {  withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectCategory } from '../actions/actions';
import PostListItem from './PostListItem.js';

class PostListing extends Component {
   constructor(props){
      super(props);
      this.state = {
         filteredPosts:[],
      };
      this.sortAsc = 0;
   }
   componentDidMount(){
      const {posts, postsByCat} = this.props;
      //Since this method only runs when component is mounted, when the page 
      //is loaded via url, the selected cat may not match up with the cat path. 
      //If this is the case, set the global selectedCat to the category path
      let selectedCategory = this.determineTrueSelectedCategory();
      if(postsByCat.hasOwnProperty(selectedCategory)){ //if category exists
         this.filterPostsBySelectedCategory(posts,postsByCat, selectedCategory);
      }
   }
   determineTrueSelectedCategory(){
      let categoryPath = this.props.match.params.category;
      let selectedCategory = this.props.globalSettings.selectedCat;
      if(categoryPath === undefined){categoryPath = 'all';}
      if(categoryPath !== selectedCategory){
         this.props.selectCategory(categoryPath);
         selectedCategory = categoryPath;
      }
      return selectedCategory;
   }
   /* Discovered the magic of nextProps! */
   componentWillReceiveProps(nextProps){
      const {posts, postsByCat, globalSettings} = nextProps;
      let selectedCategory = globalSettings.selectedCat;//this.determineTrueSelectedCategory();//globalSettings.selectedCat;
      if(postsByCat.hasOwnProperty(selectedCategory)){ //if category exists
         this.filterPostsBySelectedCategory(posts,postsByCat, selectedCategory);
      }
   }
   sortPosts(e, field){
      this.sortAsc = !this.sortAsc;
      const {posts, postsByCat} = this.props;
      e.preventDefault();
      const category = this.props.globalSettings.selectedCat;//this.state.selectedCategory;
      
      let sortedPosts = posts
         .sort((a,b)=> {
            if(this.sortAsc){
                return a[field] - b[field];
             } else {
                return b[field] - a[field];
             }
          })
         .filter(post => postsByCat[category].indexOf(post.id) !== -1);
      this.setState({filteredPosts:sortedPosts});
   }
   
   filterPostsBySelectedCategory(posts,postsInCategory, category){
      let postsByCategory = posts.filter(post => postsInCategory[category].indexOf(post.id) !== -1);
      this.setState({filteredPosts:postsByCategory});
   }
   buildPostRows(){
      let rows = [];
      const {filteredPosts} = this.state;
      let selectedCategory = this.props.globalSettings.selectedCat;
      if(filteredPosts.length===0){
        rows.push(<div key="err" className=" col-sm-12 col-md-12 col-lg-12">Sorry, no posts available in the <span className="text-uppercase">{selectedCategory}</span> category</div>); 
      } else {
         let fpTmp = filteredPosts.map((post, i) => <PostListItem  key={i} post={post} />);
         rows = rows.concat(fpTmp); 
      }
      return rows;
   }
   
   render(){
      let globalCat = this.props.globalSettings.selectedCat;
      return(
         <div className="posts"> 
         <h2>Showing {globalCat} Posts</h2>
            <div key="header" className="row col-sm-12 col-md-12 col-lg-12 postsHeader">
               <div className="voteScore sortable col-sm-2 col-md-2 col-lg-2" onClick={(e)=>this.sortPosts(e, 'voteScore')}>Score</div>
               <div className="postTimestamp sortable col-sm-1 col-md-1 col-lg-2"  onClick={(e)=>this.sortPosts(e, 'timestamp')}>Posted</div> 
               <div className="postCategory col-sm-2 col-md-2 col-lg-2">Category</div> 
               <div className="postTitle col-sm-4 col-md-4 col-lg-4">Title</div>
               <div className="postAuthor col-sm-3 col-md-2 col-lg-2">Author</div>
            </div>
            { this.buildPostRows() }
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
      selectCategory: (data) => dispatch(selectCategory(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostListing)
