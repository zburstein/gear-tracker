import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


//redux imports
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducers/index"
import thunkMiddleware from "redux-thunk"
import {getPacks} from "./actions/packActions"



const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

store.subscribe(() =>
  console.log(store.getState())
)
store.dispatch(getPacks());

ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
