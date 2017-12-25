import React, {Component} from 'react';

class ErrorPage extends Component{
   
   /* Codes & explainations taken from https://en.wikipedia.org/wiki/List_of_HTTP_status_codes#4xx_Client_errors */
   errorCodes = {
      400:{
         errorMsg:'Bad Request',
         errorExplanation:'The server cannot process the request due to a client error.',
      },
      401:{
         errorMsg:'Unauthorized',
         errorExplanation:'Authentication is required and has failed.',
      },
      404:{
         errorMsg:'Not Found',
         errorExplanation:'The requested resource could not be found but may be available in the future.',
      },
      
   };
   
   
   render(){
      const errorCode = this.props.errorCode;
      
      return(
         <div className="row col-sm-12 col-md-12 col-lg-12">
            <h1 class="display-1">Error {errorCode}: {this.errorCodes[errorCode].errorMsg}</h1>
            <h3>{this.errorCodes[errorCode].errorExplanation}</h3>
         </div>
      );
   };
};

export default ErrorPage