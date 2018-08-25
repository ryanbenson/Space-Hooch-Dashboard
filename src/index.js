import React from 'react';
import { render } from 'react-dom';
import Router from './components/Router';
import './css/style.css';

// mount application
render(<Router />, document.querySelector('#main'));
