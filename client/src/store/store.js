import { createStore } from 'redux';

const store = createStore(reducer, {
  packLists: null,
  currentPackList: null,
  categories: null,
  gearItems: null
});