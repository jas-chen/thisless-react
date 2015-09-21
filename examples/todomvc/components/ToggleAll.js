import React from 'react';
import { Subject } from 'rx';
import { dom } from 'react-reactive-class';

const { input:Input } = dom;

function toggleAll(props) {
  const { todos$, completedCount$ } = props;
  const checked$ = completedCount$.withLatestFrom(
    todos$,
    (completedCount, todos) => completedCount === todos.length
  );

  const toggleAll$ = new Subject();

  const element = (
    <Input mount={todos$.map(todos => !!todos.length)}
           className="toggle-all"
           type="checkbox"
           checked={checked$}
           onChange={toggleAll$.onNext.bind(toggleAll$)} />
  );

  return {
    element,
    events: {
      toggleAll$
    }
  }
}

export default toggleAll;
