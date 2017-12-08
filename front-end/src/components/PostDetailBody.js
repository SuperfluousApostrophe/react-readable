import React, {Component} from 'react';
//import { Route, Link, Location, withRouter } from 'react-router-dom';

import EditItemControl from './EditItemControl.js';
import VoteControl from './VoteControl.js';

class PostDetailBody extends Component{
   
   render(){
      const {currentPost} = this.props;
      const d = new Date(currentPost.timestamp);
      const postDate = `${d.getMonth()}/${d.getDate()}/${d.getFullYear()} @ ${d.getHours()}:${d.getMinutes()} `;
      return( 
              <div className="row postDetail col-sm-12 col-md-12 col-lg-12">{currentPost!==undefined && 
              <div> 
                  <div className="row col-sm-12 col-md-12 col-lg-12">
                     <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <VoteControl currentScore={currentPost.voteScore} voteType='post' id={currentPost.id}/> 
                        <EditItemControl item={currentPost} controlType="post"/>
                     </div>
                     <div className=" col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <div className="postTitle row h1">{currentPost.title}</div>
                        <div className="row lead">[Created at {postDate} by {currentPost.author} in {currentPost.category}]</div>
                     </div>
                  </div>
                  <div className="postDetailBody col-sm-12 col-md-12 col-lg-12">{currentPost.body}</div>
            </div>
         }
         </div>
      );
   };
};
export default PostDetailBody;
   