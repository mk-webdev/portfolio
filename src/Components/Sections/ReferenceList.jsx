import React, { useState, useEffect } from "react";

const ReferenceList = ({ postsData }) => {
  let references;

  if (postsData) {
    references = postsData.map((reference, index) => {
      let achievement1 = reference.custom_fields.ReferenceDone1;
      let achievement2 = reference.custom_fields.ReferenceDone2;
      let achievement3 = reference.custom_fields.ReferenceDone3;
      let achievement4 = reference.custom_fields.ReferenceDone4;
      return (
        <article
          key={index}
          className="flex flex-col mb-16 even:lg:justify-between lg:flex-row even:lg:flex-row-reverse lg:gap-x-24 lg:mb-32">
          <a href={reference.custom_fields.Hyperlink} target="_blank">
            <picture>
              <img
                className="mb-6 grayscale focus:grayscale-0 hover:grayscale-0 transition-all duration-150 lg:mb-0 lg:w-[750px]"
                src={reference.featured_media}
                alt={reference.title}
              />
            </picture>
          </a>
          <div className="flex flex-col justify-center max-w-xl">
            <h2 className="heading-reference">{reference.title}</h2>
            {achievement1 ? <p>{achievement1}</p> : null}
            {achievement2 ? <p>{achievement2}</p> : null}
            {achievement3 ? <p>{achievement3}</p> : null}
            {achievement4 ? <p>{achievement4}</p> : null}
            {reference.custom_fields.Technologies ? (
              <p className="mt-3">{reference.custom_fields.Technologies}</p>
            ) : null}
          </div>
        </article>
      );
    });
  }
  return (
    <section className="flex flex-col-reverse pt-32 xl:pt-64">
      {references}
    </section>
  );
};

export default ReferenceList;
