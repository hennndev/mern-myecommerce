import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './context/appContext';
import { CookiesProvider } from 'react-cookie'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider>
        <CookiesProvider>
            <Router>
                <App />
            </Router>
        </CookiesProvider>
    </Provider>
);

