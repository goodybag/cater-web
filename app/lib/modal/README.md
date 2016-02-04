# Modal Component

> Manages modals so you don't have to!

This module provides the following:

* Baseline styles for modal-dialogs
  - Prevent background from scrolling when open
  - Positioning and z-index control
  - Easiliy customizable animations (uses `CSSTransitionGroup`)
* Click outside to close
* Press esc to close

## Example

__client.js__

This would be your client bootstrapping code.

```jsx
import {ModalState} from 'modal';
import {AppComponent} from './components/app';

// Create an instance to interface with your props
// You may wish to pass this through `context` for easier access
var modals = new ModalState();

// When modals open, we need to add a className to `body`
// Also, we need to respond to pressing the `esc` key
modals.registerToBody( document.body );

ReactDOM.render(
  // Pass the modals interface through your component tree
  // as props. If this gets annoying, maybe try singleton globals
  // Or context
  <AppComponent modals={modals} />
, appContainer
);
```

__components/app.js__

This would be your top-level app component.

```jsx
import {ModalContainer} from 'modal';
import {SomeModuleComponent} from './some-module-that-opens-some-modal';

export class AppComponent extends Component {
  ...
  render(){
    return (
      <div className="my-app">
        {/* Place modal container somewhere near your app root */}
        <ModalContainer modalState={this.props.modals} />

        {/* Need to communicate the modals instance */}
        <SomeModuleComponent modals={this.props.modals} />
      </div>
    );
  }
}
```

__some-modal.js__

```jsx
export class SomeModalComponent extends Component {
  render(){
    return (
      {/* Just wrap your component with the .modal class */}
      <div className="modal">
        <h1>Hello, {this.props.name}</h1>
        <p>Welcome to Modal World!</p>
        <button onClick={this.props.requestClose}>Close</button>
      </div>
    );
  }
}
```

__some-module-that-opens-some-modal.js__


```jsx
import {SomeModalComponent} from './some-modal';

export class SomeModuleComponent extends Component {
  constructor( props, context ){
    super( props, context );
    this.onModalOpenCLick = this.onModalOpenCLick.bind( this );
  }

  render(){
    return (
      {/* Just wrap your component with the .modal class */}
      <div className="some-module">
        <button onClick={this.onOpenModalClick}>Open Modal</button>
      </div>
    );
  }

  onOpenModalClick(){
    this.props.modals.open( SomeModalComponent, {
      name: 'Lord Snuffleguffles'
    });
  }
}
```

While the setup is somewhat involved, there are things we could do to make it easier (global singletons, using context, extending React.Component). This should suffice for now.
