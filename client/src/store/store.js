import { createStore } from 'redux';

const store = createStore(reducer, {
  packs: null,
  pack: null,
  categories: null,
  gearItems: null
});