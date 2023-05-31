import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import List from "./pages/list"
import App from './App';
import SendNotification from "./pages/sendNotification";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/list",
        element: <List/>,
    },
    {
        path: "/send",
        element: <SendNotification/>,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
    document.getElementById('root')
);
