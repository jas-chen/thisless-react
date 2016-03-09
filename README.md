# thisless React

[![Join the chat at https://gitter.im/jas-chen/thisless-react](https://badges.gitter.im/jas-chen/thisless-react.svg)](https://gitter.im/jas-chen/thisless-react?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

> Reactive React application flow, with React, RxJS and Redux.

## It is all about...
- **thisless**: `this` cannot be found in [examples](./examples)!

- **Fully Reactive**: With [RxJS](https://github.com/Reactive-Extensions/RxJS) and [React Reactive Class](https://github.com/jas-chen/react-reactive-class), components are made reactive and observable.

- **It's just React**: No magic! Use the technique you already know, without learning new library or API and plays well with your existing React apps.

- **Pure View**: Completely decouple View from Model, no more Model injection. Code like `store.dispatch(action)` or `store.getState()` cannot be found in View.

- **High Performance**: Introduce `Static Component` and `Data Binding` by default. React will no longer diff entire huge Virtual DOM. *See Vjeux's slide [Animated — React Performance Toolbox](https://speakerdeck.com/vjeux/react-rally-animated-react-performance-toolbox) for more details*.

## Getting started
The building blocks are functions that returning element node and event streams.

```javascript
function button(props) {
  const clickEv$ = new Rx.Subject();
  const element = (
    <button onClick={clickEv$.onNext.bind(clickEv$)}>
      {props.text}
    </button>
  );

  return {
    element,
    events: {
      clickEv$
    }
  }
}
```

Compose these functions and eventually you will get a function with root element node and event streams of the app.

```javascript
const store = configureStore();
const { state$ } = store;

const {
  element: App,
  events
} = app(state$);

ReactDOM.render(App, mountNode);
```

And then write code to handle these event streams, like dealing with store or interacting with the browser.

```javascript
function handleEvent(store, events) {
  events.clickIncreaseButton$.subscribe(() => {
    store.dispatch(/* ... */);
  });
}

handleEvent(store, events);
```

**That's it!**

See [examples](./examples) for complete app code.

## Tip about Redux middleware
There is no restrictions on how to use Redux in your thisless React app, but I highly recommend using RxJS streams to replace middleware, they [handles async operations well](https://github.com/Reactive-Extensions/RxJS/blob/master/doc/gettingstarted/promises.md) and in this way your application flow will become [more clear and straightforward](./examples/counter/index.js#L24-L29) (and you write less code!).

## Feedbacks are welcome!
Feel free to discuss via opening issues or send pull requests!

## Inspirations
[Cycle.js](http://cycle.js.org/): I borrowed lots of concepts from it.

[Angular](https://angular.io/): Don't create components all the time, `element + function` is good enough to get the job done.

## License
The MIT License (MIT)
