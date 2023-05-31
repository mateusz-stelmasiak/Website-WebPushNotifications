import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import List from "./pages/list"
import App from './App';


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/list",
        element: <List/>,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
);
