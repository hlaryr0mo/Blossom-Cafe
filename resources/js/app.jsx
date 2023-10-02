import './bootstrap';

import React from 'react';
import ReactDOM from 'react-dom/client';

import App from './components/App';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Dashboard from './components/Dashboard'
import Popular from './components/MainMenu/Popular';

ReactDOM.createRoot(document.getElementById('aplication')).render(<App />);