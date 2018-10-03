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
import {initializeAppData} from "./actions/index"
import { verifyCredentials } from './redux-token-auth-config' 




const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
verifyCredentials(store)
store.dispatch(initializeAppData());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
