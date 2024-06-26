import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import 'core-js'
import { SnackbarProvider } from 'notistack';
import App from './App'
import store from './store'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
     <SnackbarProvider maxSnack={3} anchorOrigin={{ horizontal: 'right', vertical: 'top' }}>
        <App />
      </SnackbarProvider>
  </Provider>,
)
