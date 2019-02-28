import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import Redux from 'redux';
import chatReducer from 'reducers/chat-reducer'
import { Provider } from 'react-redux';

//Import Components
import App from './components/app';

const store = Redux.createStore(chatReducer);

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