import { createStore } from 'redux'
import reducer from './reducer';

let store = createStore(reducer);

store.subscribe(() => console.log(store.getState()));

export default store;