import { combineReducers } from 'redux';
import {GET_CATEGORIES, RECEIVE_POSTS, CHANGE_CAT, ADD_POST_TO_CAT,ADD_CAT_TO_POST_LIST} from '../actions/actions.js';
const defaultPostState = {items: [], postsByCategory:{all:[]} };
const defaultCategoryList = {categories: []};
//
function post(state = defaultPostState, action) {
   const {title, body, author, category, timestamp, id} = action;
   const ALL = "all";
   switch (action.type) {
      case RECEIVE_POSTS:
         return {
            ...state,
            items: action.posts
//           action.posts
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
//      case ADD_POST_TO_CATEGORY:
//         return{
//            ...state,
//            postsByCategory:{
//               category:{
//                  ...state[category],
//                  id
//               }
//            }
//         };
//      case CREATE_POST:
//         return {
//            ...state,
//           [id]:{
//               title: title,
//               body: body,
//               author:author,
//               category: category,
//               timestamp:timestamp
//           } 
//         };
//      case EDIT_POST:
//         return {
//            ...state,
//           [id]:{
//               ...state[id],
//               title: title,
//               body: body,
//           } 
//         };
//      case DELETE_POST:
//         return {
//            ...state,
//           [id]:null 
//         };
      default:
         return state;
}
}
function categories(state = defaultCategoryList, action) {
   switch (action.type) {
      case GET_CATEGORIES:
         return {
            categories: action.categories
         };
//      case GET_POSTS_BY_CATEGORY:
//         return{
//            
//         };
      default:
         return state;
}
}
;
function foo(state = {text:"I am a monkey"}, action){
   return state;
}
;

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
}

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
//      food,
//      calendar
   post,
   categories,
   foo, 
   globalStateSettings
})