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

//TODO You can provide a way better UX than this when your app throws errors by providing your own errorElement props on <Route>
// Fehler werden nicht richtig gecached -> nachsehen wieso

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} errorElement={<Error />} />
      <Route path="/works" element={<Works />} errorElement={<Error />} />
      <Route path="/webdev" element={<WebDev />} errorElement={<Error />} />
      <Route path="*" element={<Error />} />
    </Route>
  )
);
