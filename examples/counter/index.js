import ReactDOM from 'react-dom';
import { bindActionCreators } from 'redux';
import counter from './components/counter';
import configureStore from './store/configureStore';
import * as CounterActions from './actions/counter';

function handleEvent(store, events) {
  const actions = bindActionCreators(CounterActions, store.dispatch);

  events.increment$.subscribe(() => {
    actions.increment();
  });

  events.decrement$.subscribe(() => {
    actions.decrement();
  });

  events.incrementIfOdd$.subscribe(() => {
    if (store.getState().counter % 2 !== 0) {
      actions.increment();
    }
  });

  events
    .incrementAsync$
    .delay(1000)
    .subscribe(() => {
      actions.increment();
    });
}


const store = configureStore();
const counter$ = store.state$.map(state => state.counter);

const { element: Counter, events } = counter(counter$);

handleEvent(store, events);

ReactDOM.render(Counter, document.getElementById('root'));
