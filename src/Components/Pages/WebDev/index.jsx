import React, { useContext, useRef } from "react";
import Contact from "../../Sections/Contact";
import { Context } from "../../Helpers/Context";
import { useMetaData, useDataFilter } from "../../Helpers/customHooks";
import Skills from "../../Sections/Skills";
import ParticleEffect from "../../Sections/Three/Particles/script";

const WebDev = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const data = useContext(Context)[4];
  const renderNode = useRef();

  let pageData, postsData, meta, particleImg;

  if (data) {
    pageData = useDataFilter(data, position, "page")[0];
    postsData = useDataFilter(data, position, "posts");
    meta = useMetaData(pageData.title, pageData.content, lang);
    particleImg = pageData.featured_media;
  }

  return (
    <>
      {meta ? meta : null}
      <section className="flex flex-col lg:flex-row">
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] xl:w-1/2">
          <h1 className="heading">{pageData ? pageData.title : ""}</h1>
          <p className="max-w-lg lg:max-w-xl">
            {pageData ? pageData.content : ""}
          </p>
        </article>
        <ParticleEffect particleImg={particleImg} position={position} />
      </section>
      <Skills data={postsData} />
      {pageData ? <Contact pageData={pageData.custom_fields} /> : null}
    </>
  );
};
export default WebDev;
