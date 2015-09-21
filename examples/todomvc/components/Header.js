import React from 'react';
import { Observable, Subject } from 'rx';
import todoTextInput from './TodoTextInput';

function header() {
  const save$ = new Subject();

  function handleSave(text) {
    if (text.length) {
      save$.onNext(text);
    }
  }

  const {
    element: TodoTextInput
  } = todoTextInput({
    newTodo: true,
    placeholder: "What needs to be done?",
    onSave: handleSave
  });

  const element = (
    <header className="header">
      <h1>todos</h1>
      {TodoTextInput}
    </header>
  );

  return {
    element,
    events: {
      save$: save$
    }
  };
}

export default header;
