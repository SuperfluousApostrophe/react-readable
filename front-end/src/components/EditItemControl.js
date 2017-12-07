import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
//import {vote} from '../actions/actions';

class EditItemControl extends Component{
   editItem = function({id, body, title}, type, e){
      e.preventDefault();
      console.log(id, body, title);
      const timestamp = Date.now();
      if(type==='post'){
         
      } else {
         
      }
   }
   deleteItem = function(id, type, e){
      e.preventDefault();
      console.log(id, type);
      if(type==='post'){
         
      } else {
         
      }
   }
   render(){
      const {item, controlType} = this.props;
      const id = item.id;
      const body = item.body;
      const title = item.title || '';
      return( 
            <div className="row postDetailControls  col-sm-12 col-md-12 col-lg-12">
               <div className="col-md-3 col-lg-3">
                  <FontAwesome className="controlIcon" name='pencil-square-o'  onClick={(e)=>this.editItem({id:id, body:body, title:title},controlType, e )}/>
                  <FontAwesome className="controlIcon" name='trash-o'  onClick={(e)=>this.deleteItem(id,controlType, e )}/>
               </div>
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
//      state:state
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
//     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
//      changeVoteScore: (data) => dispatch(changeVoteScore(data)),
//      vote: (data) => dispatch(vote(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemControl)
   