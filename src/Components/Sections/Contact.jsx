import React, { useContext, useLayoutEffect } from "react";
import gsap from "gsap";
import { Context } from "../Helpers/Context";

const Contact = ({ pageData }) => {
  const page = useContext(Context)[2];

  const position = "Contact";
  let textSlider;
  let contactCTAs;

  // TODO SlideEffekt erst aktivieren, sobald alles geladen ist

  // if (page === "Home" && data) {
  //   useLayoutEffect(() => {
  //     let snapshot = gsap.context(() => {
  //       gsap.to(".firstLine", {
  //         transform: "translateX(-5%)",
  //         duration: 20,
  //         yoyo: true,
  //         repeat: -1,
  //         ease: "none",
  //       });
  //       gsap.to(".secondLine", {
  //         transform: "translateX(-97%)",
  //         duration: 20,
  //         yoyo: true,
  //         repeat: -1,
  //         ease: "none",
  //       });
  //     });
  //     return () => snapshot.revert();
  //   }, [data]);
  // }

  if (pageData) {
    textSlider = (
      <div className="relative">
        <p className="keywords firstLine -translate-x-full">
          {pageData.Keywords1}
        </p>
        <p className="keywords secondLine translate-x-[5%]">
          {pageData.Keywords2}
        </p>
      </div>
    );
    contactCTAs = (
      <div className="flex flex-col my-16 md:mt-32 md:mb-24 xl:mt-64 xl:mb-16">
        <div>
          <p className="font-serif text-md leading-none lg:text-lg lg:leading-8 2xl:text-xl 2xl:leading-10">
            {pageData.EMail_CTA_Text}
          </p>
          <a
            href={`mailto:${pageData.EMail}`}
            className="font-serif text-md leading-none text-primary lg:text-lg lg:leading-8 2xl:text-xl 2xl:leading-10">
            {pageData.EMail}
          </a>
        </div>
        <div className="flex flex-col relative mt-12">
          <p className="inline-block max-w-[12ch] ml-auto font-serif leading-none lg:text-md lg:leading-8 2xl:text-lg">
            {pageData.GitHub_CTA_Text}
          </p>
          <a
            className="absolute right-[18px] bottom-0 font-serif leading-none text-primary lg:text-md lg:leading-8 2xl:text-lg 2xl:right-8"
            href={pageData.GitHub}
            target="_blank">
            GitHub
          </a>
        </div>
        <div className="flex justify-center relative mt-12 ">
          <p className="inline-block max-w-[8ch] -ml-[4.75rem] font-serif leading-none lg:text-md lg:leading-8 lg:-ml-24 2xl:text-lg 2xl:-ml-32">
            {pageData.LinkedIn_CTA_Text}
          </p>
          <a
            className="absolute bottom-0 font-serif leading-none text-primary lg:text-md lg:leading-8 2xl:text-lg"
            href={pageData.LinkedIn}
            target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {page === "Home" ? textSlider : ""}
      {contactCTAs}
    </>
  );
};
export default Contact;
