import React, {Component} from 'react';
import { Route, Link, Location, withRouter } from 'react-router-dom';
class PostDetailBody extends Component{
   
   render(){
      const {currentPost} = this.props;
//      console.log(this.props);
      return( 
              <div className="row postDetail col-sm-12 col-md-8 col-lg-10">{currentPost!==undefined && 
              <div> 
                  <h2 className="row">{currentPost.title}</h2>
                  <h4 className="row">[Created at {currentPost.timestamp} by {currentPost.author} in {currentPost.category}]</h4>
                  <div className="row   col-sm-12 col-md-12 col-lg-12" >
                     <div className="col-xs-1 col-sm-2 col-md-1 col-lg-1">{currentPost.voteScore}</div>
                     <div className="postDetailBody col-xs-11 col-sm-10 col-md-11 col-lg-11">{currentPost.body}</div>
                     <div className="row postDetailControls  col-sm-12 col-md-12 col-lg-12">
                        <div className="col-md-3 col-lg-3">Edit | Delete</div>
                     </div>
                  </div>
            </div>
         }
         </div>
      );
   };
};
export default PostDetailBody;
   