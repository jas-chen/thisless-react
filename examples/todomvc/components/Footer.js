import React from 'react';
import { Subject } from 'rx';
import { dom } from 'react-reactive-class';
import classnames from 'classnames';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

const {
  a:A,
  span: Span,
  strong: Strong,
  button: Button,
  footer: Footer,
  ul: Ul,
  li:Li
} = dom;

function renderTodoCount(activeCount$) {
  const itemWord$ = activeCount$.map(activeCount => {
    return (activeCount === 1 ? 'item' : 'items');
  });

  const activeCountWord$ = activeCount$.map(
    activeCount => activeCount || 'No'
  );

  return (
    <Span className="todo-count">
      <Strong>{activeCountWord$}</Strong> <Span>{itemWord$}</Span> left
    </Span>
  );
}

function renderFilterLink(filter, selectedFilter$, onShow) {
  const title = FILTER_TITLES[filter];
  const className$ = selectedFilter$.map(
    selectedFilter => classnames({ selected: filter === selectedFilter })
  );

  return (
    <A className={className$}
       style={{ cursor: 'pointer' }}
       onClick={() => onShow(filter)}>
      {title}
    </A>
  );
}

function footer(props) {
  const { todos$, completedCount$, filter$, onShow } = props;
  const activeCount$ = todos$.map(
    todos => todos.filter(todo => !todo.completed).length
  );

  const hasTodo$ = todos$.map(todos => !!todos.length);
  const clearCompleted$ = new Subject();

  const element = (
    <Footer className="footer" mount={hasTodo$}>
      {renderTodoCount(activeCount$)}
      <Ul className="filters">
        {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
          <Li key={filter}>
            {renderFilterLink(filter, filter$, onShow)}
          </Li>
        )}
      </Ul>
      <Button className="clear-completed"
              mount={completedCount$.map(count => !!count)}
              onClick={clearCompleted$.onNext.bind(clearCompleted$)} >
        Clear completed
      </Button>
    </Footer>
  );

  return {
    element,
    events: {
      clearCompleted$
    }
  };
}

export default footer;
