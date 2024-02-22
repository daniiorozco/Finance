import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import './index.css';
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider } from 'react-redux';
import {store} from './store/store.js';

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#000e35",
    },
    secondary: {
      main: "#f50057",
    },
  },
});

import { BrowserRouter } from "react-router-dom";
import { SnackbarProvider } from "notistack";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider
          maxSnack={3}
          autoHideDuration={3000}
        >
          <CssBaseline />
          <Provider store={ store }>
          <App />
          </Provider>
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </React.StrictMode>
)
