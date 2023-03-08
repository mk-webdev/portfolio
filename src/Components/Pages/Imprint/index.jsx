import React, { useContext } from "react";
import { Context } from "../../Helpers/Context";
import { useDataFilter, useMetaData } from "../../Helpers/customHooks";

const Imprint = () => {
  const lang = useContext(Context)[0];
  const data = useContext(Context)[4];
  let pageData, meta;

  if (data) {
    pageData = useDataFilter(data, "Legal", "page")[0];
    meta = useMetaData(pageData.title, pageData.content, lang);
  }
  return (
    <>
      {meta ? meta : null}
      <section id="imprint" className="flex flex-col lg:flex-row">
        <article className="order-2 sm:-mt-32 lg:w-1/3 lg:mt-[25vh] lg:order-1 xl:w-1/2">
          <h1 className="heading">{pageData ? pageData.title : ""}</h1>
          <div
            className="max-w-lg lg:max-w-xl"
            dangerouslySetInnerHTML={{
              __html: pageData ? pageData.content : "",
            }}></div>
        </article>
      </section>
    </>
  );
};

export default Imprint;
