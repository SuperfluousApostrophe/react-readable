import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'
import {changeVoteScore} from '../actions/actions';

class VoteControl extends Component{
   constructor(props) {
      super(props);
   }
   vote = function(voteType, postId, e){
      e.preventDefault();
      const voteVals = {
        upVote:1,
        downVote:-1
      };
      this.props.changeVoteScore({voteVal:voteVals[voteType],postId:postId});
   }
   render(){
      const {postId, currentScore, state} = this.props;
      return( 
            <div> 
                  <FontAwesome className="voteControl" name='arrow-down' onClick={(e)=>this.vote('downVote', postId,e)}/>
                  {currentScore}
                  <FontAwesome className="voteControl" name='arrow-up'  onClick={(e)=>this.vote('upVote',postId,e)}/>
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
      state:state
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
//     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
      changeVoteScore: (data) => dispatch(changeVoteScore(data))
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteControl)
   