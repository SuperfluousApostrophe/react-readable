export const CREATE_POST = 'CREATE_POST';
export const EDIT_POST = 'EDIT_POST';
export const GET_POSTS = 'GET_POSTS';

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
//   console.log("trying to fetch comments for ", postId);
   const authHeader = {'Authorization': 'true'};
//   console.log(authHeader);
   return function(dispatch){
//      console.log('doing fetch');
      return fetch('http://localhost:3001/posts/'+postId+'/comments', { headers: authHeader })
      .then(
         response => response.json(),
         error => console.log('An error occurred.', error)
      )
      .then(
         comments => {
//           console.log("here");
//            console.log("Comments",comments);
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
/* When we set the vote val on the server, we receive the latest obj back from the server. Update the version in our local store. */
//export const CHANGE_VOTE_SCORE = 'VOTE';
//export function changeVoteScore(data){
//   const {voteVal, postId} = data;
////   console.log('in action creater', voteVal, postId);
//   return {
//      type:CHANGE_VOTE_SCORE,
//      vote:voteVal, 
//      id:postId
//   };
//}
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
export function deletePost(id){
   return {
      type:DELETE_POST,
      id
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
            console.log(post);
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
export function deleteItem({id, type}){
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
//            console.log(post);
            dispatch(deletePost(id));
            ////dispatch(deleteComment(id));

      });
   };
}

/*
 * 
 * next steps: 
 * -create actions/reducers to retrieve comments for each post. 
 * -- on first load of post, pull all comments for that post and save in store. 
 * -- then on each subsequent load of post, pull from comment store instead of API call
 * 
 * -fix sidebar route issue
 * -create post
 * -edit post
 * -(soft) delete post
 * -create/edit/delete comments
 * -Upvotes
 * 
 */





/* Requests a single post */
export const GET_SINGLE_POST = 'GET_SINGLE_POST';
export const getSinglePost = postId =>({
   type:GET_SINGLE_POST,
   postId:postId
});
///* Requests all comments for a single post */
//export const GET_COMMENTS_FOR_POST = 'GET_COMMENTS_FOR_POST';
//export const getSinglePost = postId =>({
//   type:GET_COMMENTS_FOR_POST,
//   postId:postId
//});





