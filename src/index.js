import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AppHeader from './features/AppHeader';
import MovieList from './features/movielist/MovieList';
import Checkout from './features/movielist/Checkout';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <Provider store={store}>
    <Router basename={process.env.PUBLIC_URL}>
        <Routes>
          <Route path="/" element={<AppHeader />}>
            <Route path="list" element={<MovieList />} />
            <Route path="checkout" element={<Checkout />} />
            <Route index element={<Navigate to="/list" />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
