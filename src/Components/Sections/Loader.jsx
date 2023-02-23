import React, { useLayoutEffect } from "react";
import gsap from "gsap";

const Loader = () => {
  useLayoutEffect(() => {
    let snapshot = gsap.context(() => {
      gsap.to(".spinner", {
        rotation: 360,
        repeat: -1,
        duration: 1,
        ease: "none",
      });
    });
    return () => snapshot.revert();
  }, []);

  return (
    <section className="fixed left-0 flex justify-center items-center w-screen h-screen">
      <div className="spinner flex justify-center items-center w-48 h-48 p-1 rounded-full bg-gradient-to-t from-primary to-dark">
        <div className="w-full h-full rounded-full bg-dark"></div>
      </div>
    </section>
  );
};
export default Loader;
