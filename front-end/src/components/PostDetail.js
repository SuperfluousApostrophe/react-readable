import React, {Component} from 'react';
class PostDetail extends Component{
   
   render(){
     
      
      return(
         <div className="row postDetail col-md-12 col-lg-12">
            <div className="row postDetailHeader">
               <div className="col-sm-1 col-md-1 col-lg-1">50,000</div>
               <div className="col-sm-11 col-md-11 col-lg-11">Post Title</div>
               <div className="col-sm-12 col-md-12 col-lg-12">Created TIME by AUTHOR in CATEGORY</div>
            </div>
            <div className="row postDetailControls">
               <div className="col-md-2 col-lg-1">Edit | Delete</div>
            </div>
            <div className="postDetailBody col-sm-12 col-md-12 col-lg-12">BODY GOES HERE</div>
         </div>
      );
   };
};
export default PostDetail;