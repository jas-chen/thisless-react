import React from 'react';
import { Observable, Subject } from 'rx';
import { dom } from 'react-reactive-class';
import classnames from 'classnames';
import { initSubject } from '../utils';

const { input:Input } = dom;

function todoTextInput({text, newTodo, editing, placeholder, onSave}) {
  const { $: text$, onNext: setText} = initSubject(text || '');

  const className = classnames({
    edit: editing,
    'new-todo': newTodo
  });

  function save(text) {
    onSave(text);
    setText('');
  }

  function handleSubmit(e) {
    const text = e.target.value.trim();
    if (e.which === 13) {
      save(text);
    }
  }

  function handleBlur(e) {
    const text = e.target.value.trim();
    if (!newTodo) {
      save(text);
    }
  }

  const element = (
    <Input className={className}
      type="text"
      placeholder={placeholder}
      autoFocus="true"
      value={text$}
      onBlur={handleBlur}
      onChange={e => setText(e.target.value)}
      onKeyDown={handleSubmit} />
  );

  return { element };
}

export default todoTextInput;
