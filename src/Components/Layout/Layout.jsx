import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import ParticleEffect from "../Sections/Three/Particles/script";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container relative md:mx-auto lg:mx-0 lg:px-[6.25rem]">
        <ParticleEffect />
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
