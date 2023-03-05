import React, { useContext } from "react";
import { useMetaData, useDataFilter } from "../../Helpers/customHooks";
import Contact from "../../Sections/Contact";
import { Context } from "../../Helpers/Context";
import ParticleEffect from "../../Sections/Three/Particles/script";
import SidescrollText from "../../Sections/SidescrollText";

const Home = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const data = useContext(Context)[4];
  let pageData, meta, particleImg;

  if (data) {
    pageData = useDataFilter(data, position, "page")[0];
    meta = useMetaData(pageData.title, pageData.content, lang);
    particleImg = pageData.featured_media;
  }
  //TODO Rerenders bei Seitenwechsel, durch verzögertes disposal bei r3f -> kein Performanceproblem
  //Übergangslösung: Fade-Animationen beim Header

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
        <ParticleEffect particleImg={particleImg} position={position} />
      </section>
      <div className="h-96 md:h-[75vh]">
        <img className="h-36" src="./m.svg" alt="Stilisiertes M" />
        <img className="h-36" src="./k.svg" alt="Stilisiertes K" />
      </div>
      {/* <MK /> */}
      <SidescrollText pageData={pageData.custom_fields} />
      {pageData ? <Contact pageData={pageData.custom_fields} /> : null}
    </>
  );
};

export default Home;
