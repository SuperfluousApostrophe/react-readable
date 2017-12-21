import React, { Component } from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar.js';
import PostDialog from './PostDialog.js';
import PostList from './PostList.js';
import { Route, Switch, withRouter, Link } from 'react-router-dom'
import PostDetail from './PostDetail.js';

class App extends Component {
   state = {
      postModalOpen:false
   };
  openPostModal = function(){
     console.log("modal is open!");
      this.setState(() => ({
         postModalOpen: true,
      }));
  }
  closePostModal = function(){
     console.log("modal is closed!");
      this.setState(() => ({
         postModalOpen: false,
      }));
  }
  
  render() {
//   const {createPost, editPost, deletePost, posts, categories} = this.props;
   const {postModalOpen} = this.state;
   
//   console.log('Store state',this.props);
//   console.log('Component state', this.state);
//<Route exact path='/' component={PostRow}/>
   return (
      <div className="App container">
         <h1>Readable</h1>
         <p className="lead">A React-Redux App for Udacity</p>
         <div className="row col-sm-12 col-md-12 col-lg-12">
            <div className="col-sm-12 col-md-8 col-lg-10">
               <Switch>
                  <Route exact path='/' component={PostList}/>
                  <Route exact path='/cat/:category' component={PostList}/>
                  <Route exact path='/cat/:category/post/:postId' component={PostDetail}/>
                  <Route exact path='/submit' component={PostDialog}/>
                  <Route exact path='/edit/:postId' component={PostDialog}/>
               </Switch>
            </div>
            <div className="col-sm-12 col-md-4 col-lg-2">
               <div className="row col-sm-12 col-md-12 col-lg-12">
                  <div className="col-sm-4 col-md-4 col-lg-4"></div>
                  <div className="col-sm-4 col-md-4 col-lg-4  btn-group">
                     <Link to={{pathname: `/submit` }}>
                        <button className="btn btn-primary">New Post</button>
                     </Link>
                  </div>  
                  <div className="col-sm-4 col-md-4 col-lg-4"></div>
               </div>
               <Sidebar/>
            </div>
         </div>
      </div>
    );
  }
}
//export const fetchCategories = () => dispatch => (
//   APIRequest.fetchCategories().then(categories => dispatch(getCategories(categories)))
//);
function mapStateToProps (state) {
   return {
//      post: state.post,
//      name:'Mike',
      categories:state.categories,
   };
}
function mapDispatchToProps (dispatch) {
  return {
//    createPost: (data) => dispatch(createPost(data)),
//    editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
