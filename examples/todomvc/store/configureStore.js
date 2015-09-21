import { createStore } from 'redux';
import rootReducer from '../reducers';
import {Subject} from 'rx';

export default function configureStore(initialState) {
  const store = createStore(rootReducer, initialState);

  const state$ = new Subject();
  store.subscribe(() => {
    state$.onNext(store.getState());
  });

  store.state$ = state$.startWith(store.getState());
  return store;
}
