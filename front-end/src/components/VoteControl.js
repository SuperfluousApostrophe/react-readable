import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import {vote} from '../actions/actions';

class VoteControl extends Component{
   vote = function(voteType, id, e){
      e.preventDefault();
//      const voteVals = {
//        upVote:1,
//        downVote:-1
//      };
      this.props.vote({voteType:voteType,id:id, voteObjType:this.props.voteType});
   }
   render(){
      const {id, currentScore} = this.props;
      return( 
            <div> 
                  <FontAwesome className="controlIcon" name='arrow-down' onClick={(e)=>this.vote('downVote', id,e)}/>
                  {currentScore}
                  <FontAwesome className="controlIcon" name='arrow-up'  onClick={(e)=>this.vote('upVote',id,e)}/>
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
      vote: (data) => dispatch(vote(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteControl)
   