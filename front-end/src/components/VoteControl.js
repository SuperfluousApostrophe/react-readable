import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';
import { connect } from 'react-redux'

class VoteControl extends Component{
   
   render(){
      const {postId, currentScore} = this.props;
//      console.log(currentPost);
      return( 
            <div> 
                  <FontAwesome className="voteControl" name='arrow-down' />
                  {currentScore}
                  <FontAwesome className="voteControl" name='arrow-up' />
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
//      posts: state.post.items,
   };
}
/*
 * This function is used to make specific actions available within this component. 
 */
function mapDispatchToProps (dispatch) {
  return {
//     fetchSinglePost: (data) => dispatch(fetchSinglePost(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(VoteControl)
   