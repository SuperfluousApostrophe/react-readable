import React, { Component } from 'react';
import { connect } from 'react-redux'
import Sidebar from './Sidebar.js';
import PostDialog from './PostDialog.js';
import PostRow from './PostRow.js';
import { Route, Switch } from 'react-router-dom'
//import PostDetail from './PostDetail.js';
//import * as APIRequest from '../utils/api'
//import {getCategories } from '../actions/actions'
//import logo from './logo.svg';
//import './App.css';

class App extends Component {
   state = {
   };
  openPostModal = function(){
     console.log("modal is open!");
  }
  render() {
//   const {createPost, editPost, deletePost, posts, categories} = this.props;
//   const {postModalOpen} = this.state;
   
//   console.log('Store state',this.props);
//   console.log('Component state', this.state);
//<Route exact path='/' component={PostRow}/>
   return (
      <div className="App container">
         <h1>Readable</h1>
         <p className="lead">A React-Redux App for Udacity</p>
         <div className="row col-sm-12 col-md-12 col-lg-12 btn-group">
            <button className="btn btn-primary" onClick={(event)=>this.openPostModal(event)}>New Post</button>
         </div>
         <Switch>
            <Route exact path='/' component={PostRow}/>
            <Route path='/cat/:category' component={PostRow}/>
         </Switch>
         <PostDialog/>   
         <Sidebar/>
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
