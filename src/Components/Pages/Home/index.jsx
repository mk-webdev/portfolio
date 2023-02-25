import React, { useContext, useRef } from "react";
import { useMetaData, useDataFilter } from "../../Helpers/customHooks";
import Contact from "../../Sections/Contact";
import { Context } from "../../Helpers/Context";
import Particles from "../../Sections/Three/Particles/script";
import MK from "../../Sections/Three/MK";

const Home = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const data = useContext(Context)[4];
  const renderNode = useRef();

  let pageData, meta, particleImg;

  if (data) {
    pageData = useDataFilter(data, position, "page")[0];
    meta = useMetaData(pageData.title, pageData.content, lang);
    particleImg = pageData.featured_media;
  }

  return (
    <>
      {meta ? meta : null}
      <section className="flex flex-col lg:flex-row">
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] lg:order-1 xl:w-1/2">
          <h1 className="heading">{pageData ? pageData.title : ""}</h1>
          <p className="max-w-lg lg:max-w-xl">
            {pageData ? pageData.content : ""}
          </p>
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
      <MK />
      {pageData ? <Contact pageData={pageData.custom_fields} /> : null}
    </>
  );
};

export default Home;
