import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';

import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './components/App';
import reduxThunk from 'redux-thunk'; // This middleware will allow us to dispatch an action that returns a function!!! This will help us later on

import i18n from './i18n';

// import the combined reducer
import reducers from './reducers'
const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

ReactDOM.render(
  <Provider store={store}>
    {/* the element inside the fallback will be rendered when we are loading the translation */}
    <Suspense fallback={<div>Loading</div>}>
      <App />
    </Suspense>
  </Provider>,
  document.getElementById('root')
);
