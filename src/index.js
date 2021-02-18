import ReactDOM from 'react-dom'
import React from 'react'
import App from './App'

import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducers'

import 'bootstrap/dist/css/bootstrap.min.css';
import backgroundImage from './imgs/back-1.png'

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
)

document.body.style.backgroundImage = `url(${backgroundImage})`

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
, document.getElementById("root"))
