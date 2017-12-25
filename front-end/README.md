# Readable Project

This is my implementation of the Readable project (aka Reddit Clone). This took way too long, although I learned a lot. 
Uses React-Redux for state management. 

##TL;DR

To get started right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
 ```bash
├── README.md - This file.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── actions
    │   └── actions.js # Contains the actions for Redux
    ├── components
    │   ├── App.js # Root of the app.
    │   ├── CommentDialog.js # Form component for adding/editing a comment
    │   ├── CommentList.js # Generate list of comments
    │   ├── CommentListItem.js # Component for a single comment
    │   ├── EditItemControl.js # Provides generic edit/delete functionality for comments & posts
    │   ├── PostDetail.js # Provides detail page for single post
    │   ├── PostDetailBody.js # Component for post details 
    │   ├── PostDialog.js # Form component for adding/editing a post  
    │   ├── PostListItem.js # Component for single post
    │   ├── PostListing.js # Generates list of posts
    │   ├── Sidebar.js # Provides access to all categories and ability to create new post
    │   └── VoteControl.js # Provides generic voting functionality for posts & comments
    ├── css
    │   └── index.css # CSS for app
    ├── reducers
    │   └── reducers.js # Contains all reducers for app
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

## Backend API

This project uses the provided background API for this project. No modifications were made to it. 

Documentation on the backend API may be found [here](https://github.com/udacity/reactnd-project-readable-starter/blob/master/api-server/README.md).


## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

## Contributing

Testers & fellow students reviewing this project may submit suggestions. No guarantee they will be merged in. 



