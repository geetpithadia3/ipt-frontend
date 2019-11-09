import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Login from './components/login';
import SignUp from './components/register/register';
import Dashboard from './components/dashboard'
import DragDrop from './components/DragDrop';

ReactDOM.render(
    <SignUp/>,
    document.getElementById('root')
);