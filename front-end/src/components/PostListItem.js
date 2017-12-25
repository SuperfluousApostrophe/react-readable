import React, {Component} from 'react';
import VoteControl from './VoteControl.js';
import {Link} from 'react-router-dom';
import EditItemControl from './EditItemControl.js';

class PostListItem extends Component{
   render(){
      const {post} = this.props;
      const d = new Date(post.timestamp);
      const postDate = (d.getMonth() + 1) + '/' + d.getDate() + '/' +  d.getFullYear();
      
      let rowData = {};
      let path = `/${post.category}/${post.id}`;
      rowData.voteScore = <div>
         <VoteControl currentScore={post.voteScore}  voteType='post' id={post.id} />
         <EditItemControl item={post} controlType="post"/>
      </div>;
      rowData.timestamp = postDate;
      rowData.category =  <Link to={path}>{post.category}</Link>;
      rowData.title =  <Link to={path}>{post.title} [{post.commentCount}]</Link>;
      rowData.author =  <Link to={path}>{post.author}</Link>;
      
      return( 
         <div className="row col-sm-12 col-md-12 col-lg-12">
            <div className="voteScore col-sm-2 col-md-3 col-lg-2" >{rowData.voteScore}</div>
            <div className="postTimestamp col-sm-1 col-md-1 col-lg-2">{rowData.timestamp}</div> 
            <div className="postCategory col-sm-2 col-md-2 col-lg-2">{rowData.category}</div> 
            <div className="postTitle col-sm-4 col-md-4 col-lg-4">{rowData.title}</div>
            <div className="postAuthor col-sm-3 col-md-2 col-lg-2">{rowData.author}</div>
         </div>
      );
   };
   
};
export default PostListItem
   