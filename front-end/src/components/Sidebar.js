import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux'
import {getCategories } from '../actions/actions'
class Sidebar extends Component{

   render(){
     const {categories, wholestore} = this.props;
//     console.log(wholestore);
//     getCategories();
//onClick={() => selectCategory(category.name)}
     return(
         <div className="sideBar col-sm-12 col-md-4 col-lg-2">
            <h2>Categories</h2>
            <ul className="list-group">
               <li className="cat-list list-group-item" >
                  <Link to={{pathname: '/'}}>All</Link>
               </li>

               {categories.map(category => (
                  <li className="cat-list list-group-item" key={category.path}>
                     <Link to={{pathname: `/cat/${category.path}` }}>{category.name}</Link>
                  </li>
               ))}
            </ul>
         </div>
      );
   };
};
/* This function is used to make the specific elements of the Redux Store
 * needed in this component available for use within this component
 *
 */
function mapStateToProps (state) {
   return {
      categories:state.categories.categories,
      wholestore:state
   };
}
/*
 * This function is used to make specific actions available within this component.
 */
function mapDispatchToProps (dispatch) {
  return {
     getCategories: (data) => dispatch(getCategories(data)),
//     selectCategory: (data) => dispatch(selectCategory(data)),
//    createPost: (data) => dispatch(createPost(data)),
//    editPost: (data) => dispatch(editPost(data)),
//    deletePost: (data) => dispatch(deletePost(data)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Sidebar)
