import React, { useContext, useRef, useState } from "react";
import Contact from "../../Sections/Contact";
import { HeaderContext } from "../../Helpers/HeaderContext";
import { useMetaData, useFetch } from "../../Helpers/customHooks";
import Cube from "../../Sections/Three/Cube";
import SustainabilityTopics from "../../Sections/SustainabilityTopics";
import Loader from "../../Sections/Loader";
import Particles from "../../Sections/Three/Particles/script";

const GreenWeb = () => {
  const lang = useContext(HeaderContext)[0];
  const position = useContext(HeaderContext)[2];
  const pageData = useContext(HeaderContext)[4];
  const renderNodeCube = useRef();
  const renderNode = useRef();
  const [index, setIndex] = useState(1);

  const { data, loading, error } = useFetch(position, lang, "posts");

  if (loading) return <Loader />;

  if (error) console.log(error);

  let meta, particleImg;
  if (pageData) {
    meta = useMetaData(pageData[0].title, pageData[0].content, lang);
    particleImg = pageData[0].featured_media;
  }

  return (
    <>
      {meta ? meta : null}
      <section className="flex flex-col lg:flex-row">
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] xl:w-1/2">
          <h1 className="heading">{pageData ? pageData[0].title : ""}</h1>
          <p className="max-w-lg lg:max-w-xl">
            {pageData ? pageData[0].content : ""}
          </p>
        </article>
        <div
          className="ml-auto w-5/6 order-1 lg:order-2 lg:absolute lg:-right-[15%] lg:h-screen"
          ref={renderNode}></div>
      </section>
      <section className="topics-container grid grid-cols-1 pt-10 md:grid-cols-2 md:items-center">
        <div className="cube h-screen" ref={renderNodeCube}></div>
        {/* <SustainabilityTopics data={data} index={index} /> */}
      </section>

      {/* {pageData && data ? (
        <Cube renderNodeCube={renderNodeCube} setIndex={setIndex} data={data} />
      ) : null} */}
      {/* <Particles
        renderNode={renderNode}
        particleImg={particleImg}
        position={position}
      /> */}

      <Contact />
    </>
  );
};
export default GreenWeb;
