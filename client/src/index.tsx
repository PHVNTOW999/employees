import React, {useEffect} from 'react';
import {createRoot} from 'react-dom/client';
import {Provider, useSelector} from 'react-redux';
import {store} from './app/store';
import reportWebVitals from './reportWebVitals';
import './index.css';
import {createBrowserRouter, RouterProvider, useNavigate} from "react-router-dom";
import {Paths} from "./paths";
import Register from "./pages/register";
import Login from "./pages/login";
import {ConfigProvider, theme} from "antd";
import {Auth} from "./features/auth/auth";
import {Employees} from "./pages/employees";
import {selectUser} from "./features/auth/authSlice";
import {TestPage} from "./pages/test";

const container = document.getElementById('root')!;
const root = createRoot(container);

const router = createBrowserRouter([
    {
        path: Paths.home,
        element: <Employees/>
    },
    {
        path: Paths.login,
        element: <Login/>
    },
    {
        path: Paths.register,
        element: <Register/>
    },
    {
        path: Paths.test,
        element: <TestPage />
    },
]);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <ConfigProvider theme={{algorithm: theme.darkAlgorithm}}>
                <Auth>
                    <RouterProvider router={router}/>
                </Auth>
            </ConfigProvider>
        </Provider>
    </React.StrictMode>
);

reportWebVitals();
