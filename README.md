# Thisless React

> Reactive React application flow, with RxJS, React and Redux.

## It is all about...
- **thisless**: `this` cannot be found in [examples](./examples)!

- **Fully Reactive**: With [RxJS](https://github.com/Reactive-Extensions/RxJS) and [React Reactive Class](https://github.com/jas-chen/react-reactive-class), components are made reactive and observable.

- **It's just React**: No magic! Use the technique you already know, without learning new library or API and plays well in your existing React apps.

- **Pure View**: Completely decouple View from Model, code like `dispatch(action)` or `getState()` cannot be found in View.

- **High Performance**: Introduce `StaticContainer` and `Data Binding` by default. React will no longer diff entire huge Virtual DOM. *See Vjeux's talk [Animated — React Performance Toolbox](https://speakerdeck.com/vjeux/react-rally-animated-react-performance-toolbox) on React Rally for more details*.

## Feedbacks are welcome!
Feel free to discuss via opening issues!

## Inspiration
[Cycle.js](http://cycle.js.org/), I borrowed lots of concepts from it.

## License
The MIT License (MIT)
