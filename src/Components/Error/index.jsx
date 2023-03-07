import React, { useContext } from "react";
import { Context } from "../Helpers/Context";
import { useDataFilter, useMetaData } from "../Helpers/customHooks";

const Error = () => {
  const lang = useContext(Context)[0];
  const position = useContext(Context)[2];
  const setPosition = useContext(Context)[3];
  const data = useContext(Context)[4];
  let pageData, meta;

  setPosition("Error");
  setTimeout(() => {
    setPosition("Home");
  }, 5000);

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
    </>
  );
};

export default Error;
