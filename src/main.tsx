import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './global.css'

import {Provider} from "react-redux";
import store from "./store/store.ts";
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from "react-router-dom";

const router = createBrowserRouter(createRoutesFromElements(
    <Route path={'/*'} element={<App />} />
))

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <RouterProvider router={router} />
        </Provider>
    </React.StrictMode>,
)
