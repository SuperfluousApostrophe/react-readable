import React, {Component} from 'react';
import FontAwesome from 'react-fontawesome';

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
export default VoteControl;
   