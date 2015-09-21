import React from 'react';
import { Observable, Subject } from 'rx';
import { dom } from 'react-reactive-class';
import { initSubject } from '../utils';
import todoList from './TodoList';
import toggleAll from './ToggleAll';
import footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

const { div:Div } = dom;

function mainSection(props) {
  const { todos$ } = props;
  const { $: filter$, onNext: onShow } = initSubject(SHOW_ALL);

  const filteredTodos$ = Observable.combineLatest(
    todos$,
    filter$,
    (todos, filter) => todos.filter(TODO_FILTERS[filter])
  );

  const completedCount$ = todos$.map(todos => {
    return todos.filter(todo => todo.completed).length;
  });

  const {
    element: ToggleAll,
    events: { toggleAll$ }
  } = toggleAll({ todos$, completedCount$ });

  const {
    element$: TodoList$,
    events: {
      deleteTodo$,
      completeTodo$,
      editTodo$
    }
  } = todoList({ todos$: filteredTodos$ });

  const {
    element: Footer,
    events: { clearCompleted$ }
  } = footer({
    todos$,
    completedCount$,
    filter$,
    onShow
  });

  const element = (
    <section className="main">
      {ToggleAll}
      <Div>{TodoList$}</Div>
      {Footer}
    </section>
  );

  return {
    element,
    events: {
      toggleAll$,
      clearCompleted$,
      deleteTodo$,
      completeTodo$,
      editTodo$
    }
  };
}

export default mainSection;
