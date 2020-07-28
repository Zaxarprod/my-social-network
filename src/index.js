import React, {Component} from 'react';
import {BrowserRouter, Route} from 'react-router-dom';
import ReactDOM from 'react-dom';
import {render} from 'react-dom';
import App from "./App";
import './index.css';

	render(
		<BrowserRouter>
			<App />
		</BrowserRouter>
	, document.getElementById('root')

	);
