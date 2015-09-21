import React from 'react';
import { Subject } from 'rx';
import { dom } from 'react-reactive-class';
import classnames from 'classnames';
import { initSubject } from '../utils';
import todoTextInput from './TodoTextInput';

const { li: Li } = dom;

function todoItem(props) {
  const { key, todo, deleteTodo, completeTodo, editTodo } = props;
  const { $: editing$, onNext: setEditing } = initSubject(false);

  function handleDoubleClick() {
    setEditing(true);
  }

  function handleSave(text) {
    const id = todo.id;
    if (text.length === 0) {
      deleteTodo({id});
    } else {
      editTodo({id, text});
    }

    setEditing(false);
  }

  const className$ = editing$.map(
    editing => classnames({
      completed: todo.completed,
      editing
    })
  );

  const {
    element: TodoTextInput,
  } = todoTextInput({
    text: todo.text,
    newTodo: false,
    editing: true,
    onSave: handleSave
  });

  const Todo = (
    <div className="view">
      <input className="toggle"
             type="checkbox"
             checked={todo.completed}
             onChange={() => completeTodo({id: todo.id})} />
      <label onDoubleClick={handleDoubleClick}>
        {todo.text}
      </label>
      <button className="destroy"
              onClick={() => deleteTodo({id: todo.id})} />
    </div>
  );

  const Todo$ = editing$.map(
    editing => editing ? TodoTextInput: Todo
  );

  const element = (
    <Li key={key} className={className$}>
      {Todo$}
    </Li>
  );

  return { element };
}

export default todoItem;
