import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import SignUp from './components/register/register';
import Dashboard from './components/dashboard'
import { routing } from './routing';
import Barchart from "./components/charts/Barchart"
ReactDOM.render(
    routing,
    document.getElementById('root')
);