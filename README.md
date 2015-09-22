# Thisless React

> Reactive React application flow, with RxJS, React and Redux.

## It is all about...
- **thisless**: `this` cannot be found in [examples](./examples)!

- **Fully Reactive**: With [RxJS](https://github.com/Reactive-Extensions/RxJS) and [React Reactive Class](https://github.com/jas-chen/react-reactive-class), components are made reactive and observable.

- **It's just React**: No magic! Use the technique you already know, without learning new library or API and plays well with your existing React apps.

- **Pure View**: Completely decouple View from Model, no more Model injection. Code like `store.dispatch(action)` or `store.getState()` cannot be found in View.

- **High Performance**: Introduce `Static Component` and `Data Binding` by default. React will no longer diff entire huge Virtual DOM. *See Vjeux's slide [Animated — React Performance Toolbox](https://speakerdeck.com/vjeux/react-rally-animated-react-performance-toolbox) for more details*.

## Getting started
The building blocks are functions that returning element and event streams.

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

Compose these functions and you will get a function with root elements and event streams of the app.

```javascript
const {
  element: App,
  events
} = app({
  state$
});

ReactDOM.render(App, mountNode);
```

And then write code to handle these event streams, like dealing with store.
```javascript
function handleEvent(store, events) {
  events.clickIncreaseButton$.subscribe(() => {
    store.dispatch(/* ... */);
  });
}

const store = configureStore();
handleEvent(store, events);
```

**That's it!**

See [examples](./examples) for complete app code.

## Feedbacks are welcome!
Feel free to discuss via opening issues!

## Inspirations
[Cycle.js](http://cycle.js.org/): I borrowed lots of concepts from it.

[Angular](https://angular.io/): Don't create components all the time, `element + function` is good enough to get the job done.

## License
The MIT License (MIT)
