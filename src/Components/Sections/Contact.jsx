import React from "react";

const Contact = ({ pageData }) => {
  let contactCTAs;

  if (pageData) {
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

  return <>{contactCTAs}</>;
};
export default Contact;
