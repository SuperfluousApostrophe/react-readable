import React, {Component} from 'react';
//import { Route, Link, Location, withRouter } from 'react-router-dom';

import EditItemControl from './EditItemControl.js';
import VoteControl from './VoteControl.js';

class PostDetailBody extends Component{
   
   render(){
      const {currentPost} = this.props;
      return( 
              <div className="row postDetail col-sm-12 col-md-8 col-lg-10">{currentPost!==undefined && 
              <div> 
                  <h2 className="row">{currentPost.title}</h2>
                  <h4 className="row">[Created at {currentPost.timestamp} by {currentPost.author} in {currentPost.category}]</h4>
                  <div className="row col-sm-12 col-md-12 col-lg-12" >
                     <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3"><VoteControl currentScore={currentPost.voteScore} voteType='post' id={currentPost.id}/> </div>
                     <div className="postDetailBody col-xs-9 col-sm-9 col-md-9 col-lg-9">{currentPost.body}</div>
                     <EditItemControl item={currentPost} controlType="post"/>
                  </div>
            </div>
         }
         </div>
      );
   };
};
export default PostDetailBody;
   