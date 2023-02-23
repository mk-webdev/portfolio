import React, { useContext, useLayoutEffect, useRef, useEffect } from "react";
import gsap from "gsap";
import { HeaderContext } from "../Helpers/HeaderContext";
import { useFetch } from "../Helpers/customHooks";
import Loader from "../Sections/Loader";

const Contact = () => {
  const lang = useContext(HeaderContext)[0];
  const page = useContext(HeaderContext)[2];

  const position = "Contact";
  let textSlider;
  let contactCTAs;

  const { data, loading, error } = useFetch(position, lang, "pages");

  if (loading) return <Loader />;

  if (error) console.log(error);

  // TODO SlideEffekt erst aktivieren, sobald alles geladen ist

  // if (page === "Home" && data) {
  //   useEffect(() => {
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

  if (data) {
    textSlider = (
      <div className="relative">
        <p className="keywords firstLine -translate-x-full">
          {data[0].custom_fields.Keywords1}
        </p>
        <p className="keywords secondLine translate-x-[5%]">
          {data[0].custom_fields.Keywords2}
        </p>
      </div>
    );
    contactCTAs = (
      <div className="flex flex-col my-16 md:mt-32 md:mb-24 xl:mt-64 xl:mb-16">
        <div>
          <p className="font-serif text-md leading-none lg:text-lg lg:leading-8 2xl:text-xl 2xl:leading-10">
            {data[0].custom_fields.EMail_CTA_Text}
          </p>
          <a
            href={`mailto:${data[0].custom_fields.EMail}`}
            className="font-serif text-md leading-none text-primary lg:text-lg lg:leading-8 2xl:text-xl 2xl:leading-10">
            {data[0].custom_fields.EMail}
          </a>
        </div>
        <div className="flex flex-col relative mt-12">
          <p className="inline-block max-w-[12ch] ml-auto font-serif leading-none lg:text-md lg:leading-8 2xl:text-lg">
            {data[0].custom_fields.GitHub_CTA_Text}
          </p>
          <a
            className="absolute right-[18px] bottom-0 font-serif leading-none text-primary lg:text-md lg:leading-8 2xl:text-lg 2xl:right-8"
            href={data[0].custom_fields.GitHub}
            target="_blank">
            GitHub
          </a>
        </div>
        <div className="flex justify-center relative mt-12 ">
          <p className="inline-block max-w-[8ch] -ml-[4.75rem] font-serif leading-none lg:text-md lg:leading-8 lg:-ml-24 2xl:text-lg 2xl:-ml-32">
            {data[0].custom_fields.LinkedIn_CTA_Text}
          </p>
          <a
            className="absolute bottom-0 font-serif leading-none text-primary lg:text-md lg:leading-8 2xl:text-lg"
            href={data[0].custom_fields.LinkedIn}
            target="_blank">
            LinkedIn
          </a>
        </div>
      </div>
    );
  }

  return (
    <>
      {page === "Home" ? (
        <div className="mt-12 mb-16 lg:mt-36 lg:mb-40">
          <img
            className="ml-auto w-3/4 sm:max-w-xs lg:ml-0 lg:translate-x-64 xl:translate-x-80"
            src={data ? data[0].featured_media : ""}
          />
        </div>
      ) : (
        ""
      )}
      {page === "Home" ? textSlider : ""}
      {contactCTAs}
    </>
  );
};
export default Contact;
