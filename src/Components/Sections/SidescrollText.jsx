import React, { useLayoutEffect } from "react";
import gsap from "gsap";

const SidescrollText = ({ pageData, lang }) => {
  let textSlider, transformRange;

  useLayoutEffect(() => {
    if (lang == "en") {
      transformRange = "translateX(-58%)";
    } else {
      transformRange = "translateX(-60%)";
    }
    let snapshot = gsap.context(() => {
      gsap.to(".firstLine", {
        transform: transformRange,
        duration: 10,
        yoyo: true,
        repeat: -1,
        ease: "none",
      });
      gsap.to(".secondLine", {
        transform: "translateX(0)",
        duration: 10,
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
        <p className="keywords firstLine translate-x-0">{pageData.Keywords1}</p>
        <p className="keywords secondLine -translate-x-[60%]">
          {pageData.Keywords2}
        </p>
      </div>
    );
  }

  return <>{textSlider}</>;
};

export default SidescrollText;
