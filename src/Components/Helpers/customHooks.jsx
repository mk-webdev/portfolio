import React, { useState } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const useMetaData = (title, description, lang) => {
  return (
    <HelmetProvider>
      <Helmet>
        <html lang={lang} amp />
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
    </HelmetProvider>
  );
};

function initialValue(item, value) {
  if (!window.localStorage.getItem(item)) {
    return value;
  } else {
    return JSON.parse(window.localStorage.getItem(item));
  }
}

export const useLocalStorage = (key, initValue) => {
  const [value, setValue] = useState(() => {
    return initialValue(key, initValue);
  });

  return [value, setValue];
};

const filter = (data, position) => {
  let pageData = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].category === position) {
      pageData.push(data[i]);
    }
  }
  return pageData;
};

export const useDataFilter = (data, position, type) => {
  let filteredData;
  switch (type) {
    case "page":
      filteredData = filter(data[0], position);
      return filteredData;
      break;
    case "posts":
      filteredData = filter(data[1], position);
      return filteredData;
      break;
    case "media":
      filteredData = filter(data[2], position);
      return filteredData;
      break;
  }
};
