import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="container flex justify-between mx-auto mb-6">
        <p className="font-serif text-xs md:text-base">no cookies :)</p>

        <Link to="imprint" className="font-serif text-xs md:text-base">
          Impressum
        </Link>
      </footer>
    </>
  );
};
export default Footer;
