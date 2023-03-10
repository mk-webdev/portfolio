import React, { useContext } from "react";
import { useMetaData, useDataFilter } from "../../Helpers/customHooks";
import Contact from "../../Sections/Contact";
import { Context } from "../../Helpers/Context";
import SidescrollText from "../../Sections/SidescrollText";

const Home = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const data = useContext(Context)[4];
  let pageData, meta;

  if (data) {
    pageData = useDataFilter(data, position, "page")[0];
    meta = useMetaData(pageData.title, pageData.content, lang);
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
      </section>
      <div className="relative flex flex-col mt-24 mb-20 lg:mt-48 lg:mb-36 lg:mr-64">
        <img
          className="h-32 sm:h-48 md:h-72"
          src="./m.svg"
          alt="Stilisiertes M"
        />
        <img
          className="h-32 ml-32 -mt-6 sm:h-48 sm:ml-48 sm:-mt-8 md:h-72 md:ml-72 md:-mt-12"
          src="./k.svg"
          alt="Stilisiertes K"
        />
      </div>
      {pageData ? (
        <SidescrollText pageData={pageData.custom_fields} lang={lang} />
      ) : null}
      {pageData ? <Contact pageData={pageData.custom_fields} /> : null}
    </>
  );
};

export default Home;
