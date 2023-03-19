import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";
import Layout from "../Layout/Layout";
import Home from "../Pages/Home";
import WebDev from "../Pages/WebDev";
import Error from "../Error";
import Works from "../Pages/Works";
import Imprint from "../Pages/Imprint";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />} errorElement={<Error />}>
      <Route index element={<Home />} />
      <Route path="/works" element={<Works />} />
      <Route path="/webdev" element={<WebDev />} />
      <Route path="/imprint" element={<Imprint />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
