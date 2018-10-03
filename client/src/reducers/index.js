import { combineReducers } from 'redux'
import {packs, currentPackID} from "./packReducers"
import {categories} from "./categoryReducers"
import {gearItems} from "./gearItemReducers"
import {isInitiated} from "./isInitiatedReducer"
import {alert} from "./alertReducers"
import {modal} from "./modalReducers"
import { reduxTokenAuthReducer } from 'redux-token-auth'


const rootReducer = combineReducers({
  packs,
  currentPackID,
  categories,
  gearItems,
  isInitiated,
  alert,
  modal,
  reduxTokenAuth: reduxTokenAuthReducer
});

export default rootReducer