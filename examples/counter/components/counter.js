import React from 'react';
import { dom } from 'react-reactive-class';
import Rx from 'rx';

const { span: Span } = dom;

function button(text) {
  const clickEv$ = new Rx.Subject();
  const element = (
    <button onClick={clickEv$.onNext.bind(clickEv$)}>{text}</button>
  );

  return {
    element,
    events: {
      clickEv$
    }
  }
}

function counter(counter$) {
  const {
    element: IncrementButton,
    events: { clickEv$: increment$ }
  } = button('+');

  const {
    element: DecrementButton,
    events: { clickEv$: decrement$ }
  } = button('-');

  const {
    element: IncrementIfOddButton,
    events: { clickEv$: incrementIfOdd$ }
  } = button('Increment if odd');

  const {
    element: IncrementAsyncButton,
    events: { clickEv$: incrementAsync$ }
  } = button('Increment async');

  const element = (
    <p>
      Clicked: <Span>{counter$}</Span> times
      {' '}
      {IncrementButton}
      {' '}
      {DecrementButton}
      {' '}
      {IncrementIfOddButton}
      {' '}
      {IncrementAsyncButton}
    </p>
  );

  return {
    element,
    events: {
      increment$,
      decrement$,
      incrementIfOdd$,
      incrementAsync$
    }
  };
}

export default counter;
