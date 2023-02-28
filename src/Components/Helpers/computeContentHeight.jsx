import React, { useLayoutEffect, useEffect } from "react";

const computeContentHeight = () => {
  window.addEventListener("resize", handleResize);
  let root = document.querySelector(":root");

  function handleResize() {
    let content = document.querySelectorAll(".cuboid_bot");
    for (let j = 0; j < content.length; j++) {
      let currentCuboidBot = content.item(j);
      let cuboidContentHeight =
        currentCuboidBot.firstChild.firstChild.offsetHeight;
      switch (j) {
        case 0:
          root.style.setProperty(
            "--height-content-1",
            cuboidContentHeight + 30 + "px"
          );
          break;
        case 1:
          root.style.setProperty(
            "--height-content-2",
            cuboidContentHeight + 30 + "px"
          );
          break;
        case 2:
          root.style.setProperty(
            "--height-content-3",
            cuboidContentHeight + 30 + "px"
          );
          break;
      }
    }
  }
  useEffect(() => {
    handleResize();
  }, []);
};
export default computeContentHeight;
