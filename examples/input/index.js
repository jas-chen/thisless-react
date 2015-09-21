import React from 'react';
import ReactDOM from 'react-dom';
import Rx from 'rx';

import {dom} from 'react-reactive-class';

const { div:Div, span:Span } = dom;

window.style$ = new Rx.Subject();
window.text$ = new Rx.Subject();

class App extends React.Component {
  render() {
    console.log('App rendered.');

    return (
      <div>
        <h1>Demo</h1>
        <Div style={window.style$}>Hello</Div>
        <Span>{window.text$}</Span>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
