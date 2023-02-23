import React, { useContext, useRef } from "react";
import { useMetaData } from "../../Helpers/customHooks";
import Contact from "../../Sections/Contact";
import { HeaderContext } from "../../Helpers/HeaderContext";
import Particles from "../../Sections/Three/Particles/script";

const Home = () => {
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
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] lg:order-1 xl:w-1/2">
          <h1 className="heading">{data ? data[0].title : ""}</h1>
          <p className="max-w-lg lg:max-w-xl">{data ? data[0].content : ""}</p>
        </article>
        <div
          className="ml-auto w-5/6 order-1 lg:order-2 lg:absolute lg:-right-[15%] lg:h-screen"
          ref={renderNode}></div>
      </section>

      {/* <Particles
        renderNode={renderNode}
        particleImg={particleImg}
        position={position}
      /> */}

      <Contact />
    </>
  );
};

export default Home;
