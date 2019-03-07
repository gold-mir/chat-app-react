import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { createStore } from 'redux';
import chatReducer from './reducers/chat-reducer';
import { Provider } from 'react-redux';

//Import Components
import App from './components/app';

const store = createStore(chatReducer);

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