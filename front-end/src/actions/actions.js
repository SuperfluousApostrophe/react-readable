const uuidv4 = require('uuid/v4');
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
            dispatch(getCategories(json.categories));
            for(let cat of json.categories){
               dispatch(addCategoryToPostList(cat));
            }
      });
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
            for(let post of posts){
               dispatch(addPostToCategory(post));
            }
            //call the action creator receivePosts
            dispatch(receivePosts(posts));
      });
   };
}

export const RECEIVE_COMMENTS_FOR_POST = 'RECEIVE_COMMENTS_FOR_POST';
export function receiveCommentsForPost(data){
   const {postId, comments} = data;
   return {
      type: RECEIVE_COMMENTS_FOR_POST,
      id: postId,
      comments
   };
};
/* This is a thunk, not an action creator*/
export function fetchCommentsForPost(data){
   const {postId} = data;
   const authHeader = {'Authorization': 'true'};
   return function(dispatch){
      return fetch('http://localhost:3001/posts/'+postId+'/comments', { headers: authHeader })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         comments => {
            dispatch(receiveCommentsForPost({postId:postId, comments}));
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
export const SAVE_SINGLE_POST = 'SAVE_SINGLE_POST';
export function saveSinglePost(data){
   return {
      type:SAVE_SINGLE_POST,
      id:data.id,
      post: data
   };
}
export const SAVE_SINGLE_COMMENT = 'SAVE_SINGLE_COMMENT';
export function saveSingleComment(data){
   return {
      type:SAVE_SINGLE_COMMENT,
      postId:data.parentId,
      comment: data
   };
}
export const DELETE_POST = 'DELETE_POST';
export function deletePost({id}){
   return {
      type:DELETE_POST,
      id
   };
}
export const DELETE_COMMENT = 'DELETE_COMMENT';
export function deleteComment({id, parentId}){
   return {
      type:DELETE_COMMENT,
      id, 
      parentId
   };
}
/* This is a thunk, not an action creator*/
/*
 * changes the vote on the server by calling the API
 * 
 */
export function vote(data){
   const {voteType, id, voteObjType} = data;
   const authHeader = {'Authorization': 'true', 'Content-Type': 'application/json'};
   return function(dispatch){
      let requestURL;
      switch(voteObjType){
         case 'comment':
            requestURL = 'http://localhost:3001/comments/'+id;
            break;
         default:
            requestURL = 'http://localhost:3001/posts/'+id;
            break;
      }
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'POST' , 
         body: JSON.stringify({
             option: voteType,
           })
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         updatedObj => {
            if(voteObjType === 'post')
               dispatch(saveSinglePost(updatedObj));
            else
                dispatch(saveSingleComment(updatedObj));
      });
   };
}

/* This is a thunk, not an action creator*/
/* Fetches a single Post - will be used when upvoting - maybe*/
export function fetchSinglePost(postId){
   const authHeader = {'Authorization': 'true'}
   return function(dispatch){
      return fetch('http://localhost:3001/posts/'+postId, { headers: authHeader })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         post => {
//            console.log(post);
//            for(let post of posts){
////               console.log(post);
//               dispatch(addPostToCategory(post));
//            }
////            console.log(posts);
//            //call the action creator receivePosts
//            dispatch(receivePosts(posts));
      });
   };
}


/* This is a thunk, not an action creator*/
/* Fetches a single Post - will be used when upvoting - maybe*/
export function deleteItem({id, type, parentId}){
//   console.log("attempting to delete item", id, type);
   const authHeader = {'Authorization': 'true'};
   let requestURL;
   switch(type){
      case 'comment':
         requestURL = 'http://localhost:3001/comments/'+id;
         break;
      default:
         requestURL = 'http://localhost:3001/posts/'+id;
         break;
   }
   return function(dispatch){
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'DELETE' , 
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         post => {
            switch(type){
               case "comment":
                  dispatch(deleteComment({id, parentId}));
                  break;
               default:
                  dispatch(deletePost({id}));
                  break;
            }
      });
   };
}

export const ADD_POST = 'ADD_POST';
export function addSinglePost(newPost){
     return {
      type: ADD_POST,
      post: newPost,
   };
}
/* This is a thunk, not an action creator*/
/*
 * changes the vote on the server by calling the API
 * 
 */
export function addPost(data){
//   console.log(data);
   const {title, body, category, author} = data;
   const id = uuidv4();
   const timestamp = Date.now();
   const authHeader = {'Authorization': 'true', 'Content-Type': 'application/json'};
   return function(dispatch){
      let requestURL = 'http://localhost:3001/posts/';
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'POST' , 
         body: JSON.stringify({
             id,
             timestamp,
             title,
             category,
             body,
             author
           })
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         newPostObj => {
//            console.log(newPostObj);
            dispatch(addSinglePost(newPostObj));
            dispatch(addPostToCategory(newPostObj));
            return newPostObj;
      });
   };
}
/* This is a thunk, not an action creator*/
/*
 * changes the vote on the server by calling the API
 * 
 */
export function editPost(data){
//   console.log("editing", data);
   const {title, body, id} = data;
   const authHeader = {'Authorization': 'true', 'Content-Type': 'application/json'};
   return function(dispatch){
      let requestURL = 'http://localhost:3001/posts/'+id;
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'PUT' , 
         body: JSON.stringify({
             title,
             body,
           })
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         updatedPostObj => {
            dispatch(saveSinglePost(updatedPostObj));
            return updatedPostObj;
      });
   };
}
export const ADD_COMMENT = 'ADD_COMMENT';
export function addSingleComment(newComment){
     return {
      type: ADD_COMMENT,
      comment: newComment,
      parentId:newComment.parentId,
   };
}
export function addComment(data){
//   console.log(data);
   const {body, author, parentId} = data;
   const id = uuidv4();
   const timestamp = Date.now();
   const authHeader = {'Authorization': 'true', 'Content-Type': 'application/json'};
   return function(dispatch){
      let requestURL = 'http://localhost:3001/comments/';
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'POST' , 
         body: JSON.stringify({
             id,
             timestamp,
             body,
             author, 
             parentId
           })
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         newCommentObj => {
            dispatch(addSingleComment(newCommentObj));
            dispatch(updateCommentCount({parentId, commentModifier:1}));
      });
   };
}

export function editComment(data){
//   console.log("editing", data);
   const { body, id} = data;
   const timestamp = Date.now();
   const authHeader = {'Authorization': 'true', 'Content-Type': 'application/json'};
   return function(dispatch){
      let requestURL = 'http://localhost:3001/comments/'+id;
      return fetch(requestURL, { 
         headers: authHeader, 
         method:'PUT' , 
         body: JSON.stringify({
             timestamp,
             body,
           })
      })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         updatedCommentObj => {
            dispatch(saveSingleComment(updatedCommentObj));
      });
   };
}
export const UPDATE_COMMENT_COUNT = 'UPDATE_COMMENT_COUNT';
export function updateCommentCount(data){
   console.log(data); 
   return {
      type: UPDATE_COMMENT_COUNT,
      parentId:data.parentId,
      commentModifier:data.commentModifier,
   };
}
/* Requests a single post */
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const getSinglePost = postId =>({
   type:GET_SINGLE_POST,
   postId:postId
});




