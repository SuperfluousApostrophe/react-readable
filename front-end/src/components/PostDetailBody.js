import React, {Component} from 'react';
//import { Route, Link, Location, withRouter } from 'react-router-dom';

import EditItemControl from './EditItemControl.js';
import VoteControl from './VoteControl.js';

class PostDetailBody extends Component{
   
   render(){
      const {currentPost} = this.props;
      return( 
              <div className="row postDetail col-sm-12 col-md-12 col-lg-12">{currentPost!==undefined && 
              <div> 
                  <div className="row col-sm-12 col-md-12 col-lg-12">
                     <div className="col-xs-3 col-sm-3 col-md-3 col-lg-3">
                        <VoteControl currentScore={currentPost.voteScore} voteType='post' id={currentPost.id}/> 
                        <EditItemControl item={currentPost} controlType="post"/>
                     </div>
                     <div className=" col-xs-9 col-sm-9 col-md-9 col-lg-9">
                        <h2 className="row">{currentPost.title}</h2>
                        <h5 className="row">[Created at {currentPost.timestamp} by {currentPost.author} in {currentPost.category}]</h5>
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
   