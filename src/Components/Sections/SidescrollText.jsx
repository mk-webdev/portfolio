import React, { useLayoutEffect } from "react";
import gsap from "gsap";

const SidescrollText = ({ pageData }) => {
  console.log(
    "🚀 ~ file: SidescrollText.jsx:5 ~ SidescrollText ~ pageData:",
    pageData
  );
  let textSlider;

  useLayoutEffect(() => {
    let snapshot = gsap.context(() => {
      gsap.to(".firstLine", {
        transform: "translateX(-5%)",
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".secondLine", {
        transform: "translateX(-97%)",
        duration: 20,
        yoyo: true,
        repeat: -1,
        ease: "none",
      });
    });
    return () => snapshot.revert();
  }, [textSlider]);

  if (pageData) {
    textSlider = (
      <div className="relative">
        <p className="keywords firstLine -translate-x-full">
          {pageData.Keywords1}
        </p>
        <p className="keywords secondLine translate-x-[5%]">
          {pageData.Keywords2}
        </p>
      </div>
    );
  }

  return <>{textSlider}</>;
};

export default SidescrollText;
