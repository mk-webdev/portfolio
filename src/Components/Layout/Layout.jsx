import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ParticleEffect from "../Sections/Three/Particles/script";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container relative mx-auto">
        <ParticleEffect />
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
