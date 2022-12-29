import "./App.css";
import logo from "./logo.svg";
import routesConfig from "./routesConfig";
import { Routes, Route } from "react-router-dom";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter(routesConfig);

const App = () => <RouterProvider router={router} />

export default App;
