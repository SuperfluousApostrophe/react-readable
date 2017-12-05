import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import './css/index.css';
import './css/lux.bootstrap.min.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import { createStore, applyMiddleware, compose } from 'redux'
import reducer from './reducers/reducers'
import { Provider } from'react-redux'
import thunk from 'redux-thunk';
import {fetchCategories, fetchPosts} from './actions/actions';


const logger = store => next => action => {
   console.group(action.type);
   console.info('dispatching', action);
   let result = next(action);
   console.log('next state', store.getState());
   console.groupEnd(action.type);
   return result;
};
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
   reducer, 
   composeEnhancers(
      applyMiddleware(
//         logger, 
         thunk
      )
   )
);
store.dispatch(fetchPosts());
store.dispatch(fetchCategories());
//console.log(store.getState());
ReactDOM.render(<Provider store={store}><BrowserRouter><App /></BrowserRouter></Provider>, document.getElementById('root'));
registerServiceWorker();
