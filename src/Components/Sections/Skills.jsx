import React from "react";

const Skills = ({ data }) => {
  let skills;

  if (data) {
    let i = 0;
    skills = data.map((item, index) => {
      let content;
      switch (i) {
        case 0:
          content = <p>{item.content}</p>;
          break;
        case 1:
          content = (
            <div
              className="logos"
              dangerouslySetInnerHTML={{ __html: item.content }}></div>
          );
          break;
        case 2:
          content = (
            <div dangerouslySetInnerHTML={{ __html: item.content }}></div>
          );
          break;
      }
      i++;
      return (
        <article key={index} className="skill-container">
          <div className="relative px-6 py-1 border border-b-0 border-primary shadow-3d-top pseudo-3d-top">
            <div className="flex justify-between items-center">
              <h2 className="font-serif text-primary">{item.title}</h2>
              <div className="relative w-3 h-7 text-primary after:content-['\00d7'] after:absolute after:block after:w-full after:h-full after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 hover:rotate-180 transition-transform duration-300"></div>
            </div>
          </div>
          <div className="relative p-6 border border-primary pseudo-3d-bot ">
            <div className="">{content}</div>
          </div>
        </article>
      );
    });
  }

  return (
    <section className="skills grid grid-cols-5 gap-y-16 mt-16 md:mt-32 md:gap-y-28 lg:mt-64 2xl:grid-cols-8 2xl:grid-rows-3 ">
      {data ? skills : ""}
    </section>
  );
};
export default Skills;
