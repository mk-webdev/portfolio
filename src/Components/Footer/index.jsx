import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="container flex justify-between items-center mx-auto mb-8 mt-64 sm:mb-10">
        <div className="flex items-center gap-4">
          <img
            className="w-[83px]"
            src="./cookie.svg"
            alt="Stilisierter Cookie"
          />
          <p className="font-serif text-base uppercase">no cookies</p>
        </div>

        <Link to="imprint" className="font-serif text-base uppercase">
          Impressum
        </Link>
      </footer>
    </>
  );
};
export default Footer;
