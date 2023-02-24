import React from "react";
import computeContentHeight from "../Helpers/computeContentHeight";

const Skills = ({ data }) => {
  let skills;

  if (data) {
    computeContentHeight();

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
        <article key={index}>
          <div className="cuboid_top">
            <div className="cuboid_side">
              <h2 className="font-serif text-primary">{item.title}</h2>
            </div>
            <div className="cuboid_side"></div>
            <div className="cuboid_side"></div>
            <div className="cuboid_side"></div>
          </div>
          <div className="cuboid_bot">
            <div className="cuboid_side">{content}</div>
            <div className="cuboid_side"></div>
            <div className="cuboid_side"></div>
            <div className="cuboid_side"></div>
          </div>
        </article>
      );
    });
  }

  return (
    <section className="skills flex flex-col-reverse gap-6 mt-16 md:mt-32 lg:mt-64">
      {data ? skills : ""}
    </section>
  );
};
export default Skills;
