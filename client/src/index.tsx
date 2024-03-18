import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {Paths} from "./paths";
import Register from "./pages/register";
import Login from "./pages/login";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <h1>Employees</h1>
    },
    {
        path: Paths.login,
        element: <Login />
    },
    {
        path: Paths.register,
        element: <Register />
    },
]);

root.render(
  <React.StrictMode>
    <Provider store={store}>
        <RouterProvider router={ router } />
    </Provider>
  </React.StrictMode>
);

reportWebVitals();