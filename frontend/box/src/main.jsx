import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import { persistor, store } from './redux/store.js'
import { BrowserRouter } from 'react-router'
import { ToastContainer } from "react-toastify";
import { PersistGate } from 'redux-persist/integration/react'
import { ThemeProvider } from "@material-tailwind/react";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <PersistGate persistor={persistor}>
      <Provider store={store}>
        <BrowserRouter>
          
          <ThemeProvider>
            <App />
          </ThemeProvider>
          
          <ToastContainer position="top-right" autoClose={4000} />
        </BrowserRouter>
      </Provider>
    </PersistGate>
  </StrictMode>,
)
