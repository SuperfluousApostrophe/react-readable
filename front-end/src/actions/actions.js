export const CREATE_POST = 'CREATE_POST';
export const DELETE_POST = 'DELETE_POST';
export const EDIT_POST = 'EDIT_POST';
export const GET_POSTS = 'GET_POSTS';
//export const CREATE_COMMENT ='CREATE_COMMENT';
//export const EDIT_COMMENT = 'EDIT_COMMENT';
//export const DELETE_COMMENT = 'DELETE_COMMENT';
//export const CATEGORY_LIST = 'CATEGORY_LIST';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const getCategories = categories =>({
   type:GET_CATEGORIES,   
   categories
});
export function fetchCategories(){
   const authHeader = {'Authorization': 'true'}
   return function(dispatch){
      return fetch('http://localhost:3001/categories', { headers: authHeader })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         json => {
//            console.log(json);
            dispatch(getCategories(json.categories));
            for(let cat of json.categories){
//               console.log(cat);
               dispatch(addCategoryToPostList(cat));
            }
      })
   };
}
export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const receivePosts = posts =>({
   type:RECEIVE_POSTS,   
   posts: posts
});
export const ADD_POST_TO_CAT = 'ADD_POST_TO_CAT';
export const addPostToCategory = post =>({
   type:ADD_POST_TO_CAT,   
   ...post
});
export const ADD_CAT_TO_POST_LIST = 'ADD_CAT_TO_POST_LIST';
export const addCategoryToPostList = category =>({
   type:ADD_CAT_TO_POST_LIST,   
   category: category.name
});
/* This is a thunk, not an action creator*/
export function fetchPosts(){
   const authHeader = {'Authorization': 'true'}
   return function(dispatch){
      return fetch('http://localhost:3001/posts', { headers: authHeader })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         posts => {
//            console.log(posts);
            for(let post of posts){
//               console.log(post);
               dispatch(addPostToCategory(post));
            }
//            console.log(posts);
            //call the action creator receivePosts
            dispatch(receivePosts(posts));
      });
   };
}

export const CHANGE_CAT = 'CHANGE_CAT';
export function selectCategory(categoryName){
   return {
      type:CHANGE_CAT,
      selectedCat:categoryName
   };
}