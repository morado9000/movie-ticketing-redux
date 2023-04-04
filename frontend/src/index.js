import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import AppHeader from './features/AppHeader';
import MovieList from './features/movielist/MovieList';
import Checkout from './features/movielist/Checkout';
import MovieEdit from './features/movielist/MovieEdit';
import MovieAdd from './features/movielist/MovieAdd';
import LoginForm from './features/admin/LoginForm';
import PrivateRoute from './features/admin/PrivateRoute';
import { AuthProvider } from './features/admin/AuthContext';

const container = document.getElementById('root');
const root = createRoot(container);

root.render(
    <Provider store={store}>
      <AuthProvider>
        <Router basename={process.env.PUBLIC_URL}>
            <Routes>
              <Route path="/" element={<AppHeader />}>
                <Route path="list" element={<MovieList />} />
                <Route path="checkout" element={<Checkout />} />
                <Route path="admin/">
                  <Route path="login" element={<LoginForm />} />
                  <Route path="edit" element={<PrivateRoute><MovieEdit /></PrivateRoute>} />
                  <Route path="add" element={<PrivateRoute><MovieAdd /></PrivateRoute>} />
                </Route>
                <Route index element={<Navigate to="/list" />} />
              </Route>
            </Routes>
          </Router>
        </AuthProvider>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
