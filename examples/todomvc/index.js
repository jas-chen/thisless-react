import 'babel-core/polyfill';

import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import app from './containers/App';
import configureStore from './store/configureStore';
import * as TodoActions from './actions/todos';
import 'todomvc-app-css/index.css';

function handleEvent(store, events) {
  const actions = bindActionCreators(TodoActions, store.dispatch);

  events.save$.subscribe(
    todo => actions.addTodo(todo)
  );

  events.toggleAll$.subscribe(
    () => actions.completeAll()
  );

  events.clearCompleted$.subscribe(
    () => actions.clearCompleted()
  );

  events.deleteTodo$.subscribe(
    ({id}) => actions.deleteTodo(id)
  );

  events.completeTodo$.subscribe(
    ({id}) => actions.completeTodo(id)
  );

  events.editTodo$.subscribe(
    ({id, text}) => actions.editTodo(id, text)
  );
}

const store = configureStore();
const todos$ = store.state$.map(state => state.todos);

const {
  element: App,
  events
} = app({
  todos$
});

handleEvent(store, events);

ReactDOM.render(
  App,
  document.getElementById('root')
);
