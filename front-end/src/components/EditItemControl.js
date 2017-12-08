import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import {deleteItem} from '../actions/actions';
import { Redirect } from 'react-router';

class EditItemControl extends Component{
   constructor () {
    super();
    this.state = {
      redirectOnPostDelete: false
    };
  }
   editItem = function({id, body, title}, type, e){
      e.preventDefault();
//      console.log(id, body, title);
      const timestamp = Date.now();
      if(type==='post'){
         
      } else {
         
      }
   }
   deleteItem = function(item, type, e){
      e.preventDefault();
//      console.log(id, type);
      
      if(type==='post'){
         this.props.delete({id:item.id,type});
         this.setState({ redirectOnPostDelete: true });
      } else{
         this.props.delete({id:item.id,type, parentId:item.parentId});
      }
   }
   render(){
      const {item, controlType} = this.props;
      const id = item.id;
      const body = item.body;
      const title = item.title || '';
      const redirectOnPostDelete = this.state.redirectOnPostDelete;
      return( 
            <div className="row postDetailControls  col-sm-12 col-md-12 col-lg-12 text-center">
                  <FontAwesome className="controlIcon" name='pencil-square-o'  onClick={(e)=>this.editItem({id:id, body:body, title:title},controlType, e )}/>
                  <FontAwesome className="controlIcon" name='trash-o'  onClick={(e)=>this.deleteItem(item,controlType, e )}/>
               {redirectOnPostDelete && (
                  <Redirect to="/"/>
                )}
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
      delete: (data) => dispatch(deleteItem(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EditItemControl)
   