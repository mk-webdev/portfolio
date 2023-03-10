import React, { useContext, useEffect } from "react";
import Contact from "../../Sections/Contact";
import { Context } from "../../Helpers/Context";
import { useMetaData, useDataFilter } from "../../Helpers/customHooks";
import Skills from "../../Sections/Skills";

const WebDev = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const data = useContext(Context)[4];

  let pageData, postsData, meta;

  if (data) {
    pageData = useDataFilter(data, position, "page")[0];
    postsData = useDataFilter(data, position, "posts");
    meta = useMetaData(pageData.title, pageData.content, lang);
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
      </section>
      <Skills data={postsData} />
      {pageData ? <Contact pageData={pageData.custom_fields} /> : null}
    </>
  );
};
export default WebDev;
