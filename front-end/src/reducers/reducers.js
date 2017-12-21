import { combineReducers } from 'redux';
import {ADD_POST,DELETE_COMMENT, DELETE_POST,SAVE_SINGLE_COMMENT,RECEIVE_COMMENTS_FOR_POST,SAVE_SINGLE_POST,GET_CATEGORIES, RECEIVE_POSTS, CHANGE_CAT, ADD_POST_TO_CAT,ADD_CAT_TO_POST_LIST} from '../actions/actions.js';
const defaultPostState = {items: [], postsByCategory:{all:[]} };
const defaultCategoryList = {categories: []};
const defaultComments = {};

function post(state = defaultPostState, action) {
   const {category, id} = action;
   const ALL = "all";
   switch (action.type) {
      case RECEIVE_POSTS:
         return {
            ...state,
             items: action.posts
         };
      case ADD_POST_TO_CAT:
         return {
            ...state,//spread the state
            postsByCategory:{
               ...state.postsByCategory,
              [ALL]:[
                 ...state.postsByCategory[ALL] || [], //spread the existing ids, otherwise use an empty array
                  id
              ],
              [category]:[
                  ...state.postsByCategory[category] || [], //spread the existing ids, otherwise use an empty array
                  id
              ], 
            }
         };
      case ADD_CAT_TO_POST_LIST:
         return {
            ...state,
            postsByCategory:{
               ...state.postsByCategory,
              [category]:[
                 ...state.postsByCategory[category] || []
              ]
              
            }
         };
         case SAVE_SINGLE_POST:
         return {
            ...state,
            items: [ 
               ...state.items.map(
                  function(item, index){
                     if(item.id === id){
                        item = action.post;
                     }
                     return item;
                  }
               )
           ]
         };
      case DELETE_POST:
         return {
            ...state,
            items: [ 
               ...state.items.filter(
                  function(item){
                     if(item.id !== id){
                        return item;
                     } else {
                        return null;
                     }
                  }
               )
           ]
         };
      case ADD_POST:
         return {
            ...state,
            items:[ 
                  ...state.items,
                  action.post
               ]
            
         };
      default:
         return state;
   }
};
function comments(state = defaultComments, action){
   const {id, comments} = action;
   switch(action.type){
      case RECEIVE_COMMENTS_FOR_POST:
         return {
            ...state,//spread the state
            [action.id]:comments     
      };
      case SAVE_SINGLE_COMMENT:
         return {
            ...state,
            [action.postId]: [ 
               ...state[action.postId].map(
                  function(comment, index){
                     if(comment.id === action.comment.id){
                        comment = action.comment;
                     }
                     return comment;
                  }
               )
           ]
         };
      case DELETE_POST:
         let stateCopy = [...state];
         if(stateCopy.hasOwnProperty(id)){
            delete(stateCopy[id]);
         }
         return{
            ...stateCopy
         };
      case DELETE_COMMENT:
         const {parentId} = action;
         return {
            ...state,
            [parentId]:[
               ...state[parentId].filter(function(comment){
                  if(comment.id !== id){return comment;}
                  else { return null; }
               })
            ]
         };
      default:
         return state;
   }
};

function categories(state = defaultCategoryList, action) {
   switch (action.type) {
      case GET_CATEGORIES:
         return {
            categories: action.categories
         };
      default:
         return state;
   }
};




function globalStateSettings(state = {selectedCat:"all"}, action){
   switch (action.type) {
      case CHANGE_CAT:
         return {
            ...state,
            selectedCat: action.selectedCat
         };
      default:
         return state;
}
};

//import {
//   ADD_RECIPE,
//   REMOVE_FROM_CALENDAR
//} from '../actions'

//
//function food (state = {}, action) {
//   switch (action.type) {
//     case ADD_RECIPE :
//      const { recipe } = action;
//
//      return {
//        ...state,
//        [recipe.label]: recipe,
//      }
//    default :
//      return state;
//  }
//}

//
//const initialCalendarState = {
//  sunday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  monday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  tuesday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  wednesday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  thursday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  friday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//  saturday: {
//    breakfast: null,
//    lunch: null,
//    dinner: null,
//  },
//}

//function calendar(state = initialCalendarState, action){
//   const {day, recipe, meal} = action;
//   switch(action.type){
//      case ADD_RECIPE:
//         return {
//            ...state, 
//            [day]:{
//               ...state[day],
//               [meal]:recipe.label
//            }
//         };
//      case REMOVE_FROM_CALENDAR:
//         return {  
//            ...state, 
//            [day]:{
//               ...state[day],
//               [meal]:null
//            }};
//      default:
//         return state;
//   }
//}

export default combineReducers({
   post,
   categories,
   comments,
   globalStateSettings
})