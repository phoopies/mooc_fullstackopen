import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import store from './store';
import App from './App';
import { red } from '@mui/material/colors';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: red[500],
        },
    },
});

ReactDOM.createRoot(document.getElementById('root')).render(
    <Provider store={store}>
        <ThemeProvider theme={theme}>
            <Router>
                <App />
            </Router>
        </ThemeProvider>
    </Provider>
);
