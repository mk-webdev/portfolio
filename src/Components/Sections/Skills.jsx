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
      //3d Effekt mittels box-shadows erzielen
      return (
        <article key={index} className="skill-container">
          <div className="relative px-6 py-1 border border-b-0 border-primary shadow-3d-top pseudo-3d-top">
            <div className="">
              <h2 className="font-serif text-primary">{item.title}</h2>
            </div>
          </div>
          <div className="relative px-6 py-4 border border-primary pseudo-3d-bot ">
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
