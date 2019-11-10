import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { routing } from './routing';
import Barchart from "./components/charts/Barchart"
ReactDOM.render(
    routing,
    document.getElementById('root')
);