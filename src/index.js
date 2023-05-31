import React from 'react';
import ReactDOM from 'react-dom';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import List from "./pages/list"
import App from './App';
import SendNotification from "./pages/sendNotification";
import ListPage from "./pages/list";


const router = createBrowserRouter([
    {
        path: "/",
        element: <App/>,
    },
    {
        path: "/list",
        element: <ListPage/>,
    },
    {
        path: "/send",
        element: <SendNotification/>,
    },
]);

ReactDOM.render(
    <React.StrictMode>
        <main>
            <RouterProvider router={router}/>
        </main>
    </React.StrictMode>,
    document.getElementById('root')
);
