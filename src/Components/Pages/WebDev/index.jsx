import React, { useContext, useRef } from "react";
import Contact from "../../Sections/Contact";
import { HeaderContext } from "../../Helpers/HeaderContext";
import { useMetaData } from "../../Helpers/customHooks";
import Skills from "../../Sections/Skills";
import Particles from "../../Sections/Three/Particles/script";

const WebDev = () => {
  const lang = useContext(HeaderContext)[0];
  const position = useContext(HeaderContext)[2];
  const data = useContext(HeaderContext)[4];
  const renderNode = useRef();

  let meta, particleImg;
  if (data) {
    meta = useMetaData(data[0].title, data[0].content, lang);
    particleImg = data[0].featured_media;
  }

  return (
    <>
      {meta ? meta : null}
      <section className="flex flex-col lg:flex-row">
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] xl:w-1/2">
          <h1 className="heading">{data ? data[0].title : ""}</h1>
          <p className="max-w-lg lg:max-w-xl">{data ? data[0].content : ""}</p>
        </article>
        <div
          className="ml-auto w-5/6 order-1 lg:order-2 lg:absolute lg:-right-[15%] lg:h-screen"
          ref={renderNode}></div>
        {/* <img
          className="order-1 w-5/6 max-w-none ml-auto pointer-events-none sm:w-1/2 lg:absolute lg:-right-[20%] lg:top-0 lg:w-auto lg:h-screen 2xl:right-0"
          src={data ? data[0].featured_media : ""}
        /> */}
      </section>
      {/* <Particles
        renderNode={renderNode}
        particleImg={particleImg}
        position={position}
      /> */}
      <Skills />
      <Contact />
    </>
  );
};
export default WebDev;
