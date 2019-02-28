import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import chatReducer from './reducers/chat-reducer';
import { Provider } from 'react-redux';

//Import Components
import App from './components/app';

console.log(chatReducer);
const store = createStore(chatReducer);

store.subscribe(() => {
  console.log(store.getState());
});

// ReactDOM.render(
//   <App/>
//   ,
//   document.getElementById('react-app-root')
// );

const render = (Component) => {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <Component/>
      </Provider>
    </BrowserRouter>
  , document.getElementById('react-app-root'));
}

render(App);