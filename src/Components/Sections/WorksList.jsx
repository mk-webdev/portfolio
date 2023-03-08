import React from "react";

const WorksList = ({ postsData }) => {
  let works;

  if (postsData) {
    works = postsData.map((work, index) => {
      let achievement1 = work.custom_fields.WorkDone1;
      let achievement2 = work.custom_fields.WorkDone2;
      let achievement3 = work.custom_fields.WorkDone3;
      let achievement4 = work.custom_fields.WorkDone4;
      return (
        <article
          key={index}
          className="flex flex-col mb-16 even:lg:justify-between lg:flex-row even:lg:flex-row-reverse lg:gap-x-24 lg:mb-32">
          <a href={work.custom_fields.Hyperlink} target="_blank">
            <picture>
              <img
                className="mb-6 grayscale focus:grayscale-0 hover:grayscale-0 transition-all duration-150 lg:mb-0 lg:w-[750px]"
                src={work.featured_media}
                alt={work.title}
              />
            </picture>
          </a>
          <div className="flex flex-col justify-center max-w-xl">
            <h2 className="heading-work">{work.title}</h2>
            {achievement1 ? <p>{achievement1}</p> : null}
            {achievement2 ? <p>{achievement2}</p> : null}
            {achievement3 ? <p>{achievement3}</p> : null}
            {achievement4 ? <p>{achievement4}</p> : null}
            {work.custom_fields.Technologies ? (
              <p className="mt-3">{work.custom_fields.Technologies}</p>
            ) : null}
          </div>
        </article>
      );
    });
  }
  return (
    <section className="flex flex-col-reverse pt-32 xl:pt-64">{works}</section>
  );
};

export default WorksList;
