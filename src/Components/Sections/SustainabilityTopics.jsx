import React, { useEffect } from "react";

const SustainabilityTopics = ({ index, data }) => {
  let content;
  let i = 0;

  // useEffect(() => {
  if (data) {
    content = data.map((item, index) => {
      i++;
      return (
        <article
          className="flex-col justify-self-center self-center max-w-lg xl:col-start-2"
          style={i === index ? { display: "flex" } : { display: "none" }}
          key={index}>
          <div className="mb-4">
            <p className="inline-block mr-6 font-serif text-xl leading-3 sm:text-2xl">
              {i}
            </p>
            <h2 className="inline font-serif text-lg leading-8">
              {item.title}
            </h2>
          </div>
          <p>{item.content}</p>
          <p className="mt-4 text-primary">
            {item.custom_fields.resumeSustainability}
          </p>
        </article>
      );
    });
  }
  // }, [index, data]);

  return <div className="flex flex-col">{data && content ? content : ""}</div>;
};
export default SustainabilityTopics;
