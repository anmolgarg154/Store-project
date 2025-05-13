import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import { Provider } from 'react-redux';
import { appReducer } from './reducer.js';
import { createStore } from 'redux';

let mystore = createStore(appReducer);

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={mystore}>
      <BrowserRouter>
        {/* <AuthProvider> */}
          <DataProvider>
          <App />
          </DataProvider>
        {/* </AuthProvider> */}
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
)
