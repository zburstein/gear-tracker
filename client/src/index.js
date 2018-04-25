import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';


//redux imports
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducers/index"
import {addPack} from "./actions/packActions"


const store = createStore(rootReducer);

const unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)
console.log(store.getState());
store.dispatch(addPack("Got antoer"));
console.log(store.getState());


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));
registerServiceWorker();
