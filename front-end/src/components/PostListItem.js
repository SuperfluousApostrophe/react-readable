import React, {Component} from 'react';
import VoteControl from './VoteControl.js';
import {Link} from 'react-router-dom';

class PostListItem extends Component{
   render(){
      const {post} = this.props;
      let rowData = {};
      let path = `/${post.category}/${post.id}`;
      let catPath = `/${post.category}`;
      rowData.voteScore = <VoteControl currentScore={post.voteScore}  voteType='post' id={post.id} />;
      rowData.category =  <Link to={catPath}>{post.category}</Link>;
      rowData.title =  <Link to={path}>{post.title} [{post.commentCount}]</Link>;
      rowData.author =  <Link to={path}>{post.author}</Link>;
      
      return( 
         <div className="row col-sm-12 col-md-12 col-lg-12">
            <div className="voteScore col-sm-2 col-md-3 col-lg-2" >{rowData.voteScore}</div>
            <div className="postCategory col-sm-2 col-md-2 col-lg-2">{rowData.category}</div> 
            <div className="postTitle col-sm-5 col-md-5 col-lg-6">{rowData.title}</div>
            <div className="postAuthor col-sm-3 col-md-2 col-lg-2">{rowData.author}</div>
         </div>
      );
   };
   
};
export default PostListItem
   