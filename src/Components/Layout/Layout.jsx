import { Outlet } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <main className="container relative md:mx-auto lg:mx-0 lg:px-[6.25rem]">
        {children}
        <Outlet />
      </main>
      <Footer />
    </>
  );
};
export default Layout;
