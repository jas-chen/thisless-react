import React from 'react';
import { Subject } from 'rx';
import todoItem from './TodoItem';

function todoList(props) {
  const { todos$ } = props;
  const deleteTodo$ = new Subject();
  const editTodo$ = new Subject();
  const completeTodo$ = new Subject();

  const element$ = todos$.map(todos => {
    return (
      <ul className="todo-list">
        {todos.map(todo => {
          const {
            element: TodoItem
          } = todoItem({
            key: todo.id,
            todo,
            deleteTodo: deleteTodo$.onNext.bind(deleteTodo$),
            completeTodo: completeTodo$.onNext.bind(completeTodo$),
            editTodo: editTodo$.onNext.bind(editTodo$)
          });

          return TodoItem;
        })}
      </ul>
    );
  });

  return {
    element$,
    events: {
      deleteTodo$,
      completeTodo$,
      editTodo$
    }
  }
}

export default todoList;
