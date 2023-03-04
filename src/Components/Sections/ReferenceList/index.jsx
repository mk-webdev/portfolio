import React, { useState, useEffect } from "react";
import ImageAnimation from "./ImageAnimation";

const ReferenceList = ({ postsData }) => {
  const [mousePos, setMousePos] = useState({});
  const [positionStyle, setPositionStyle] = useState({ x: 0, y: 0 });
  let references;

  useEffect(() => {
    const handleMouseMove = (event) => {
      setMousePos({ x: event.pageX - 130, y: event.pageY - 130 });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  if (postsData) {
    references = postsData.map((reference, index) => {
      return (
        <article key={index} className="group">
          <a href={reference.custom_fields.Hyperlink} target="_blank">
            <div className="relative z-20 flex flex-col pb-4 border-b-[1px] border-light xl:border-b-2 group-hover:border-primary">
              <h2 className="heading-reference w-full group-hover:text-primary">
                {reference.title}
              </h2>
              {/* <p className=" mt-2 h-0 opacity-0  group-hover:h-auto group-hover:opacity-100 transition-all duration-150">
                {reference.content}
              </p> */}
            </div>
            {/* eig. image={reference.featured_media}, wegen CORS absoluter Pfad */}
            {/* <div
              className="absolute z-10 w-100 h-100 opacity-0 transition-opacity duration-150 pointer-events-none group-hover:opacity-100"
              style={{
                left: mousePos.x + "px",
                top: mousePos.y + "px",
              }}>
              <ImageAnimation image="./trauerrede-stammberger.webp" />
            </div> */}
            <picture
              className="absolute z-10 opacity-0 transition-opacity duration-150 pointer-events-none group-hover:opacity-100"
              style={{
                left: mousePos.x + "px",
                top: mousePos.y + "px",
              }}>
              <img
                loading="lazy"
                src={reference.featured_media}
                alt={reference.title}
              />
            </picture>
          </a>
        </article>
      );
    });
  }
  return <section className="flex flex-col xl:py-64">{references}</section>;
};

export default ReferenceList;
