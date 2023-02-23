import React, { useState, useEffect } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";
import axios from "axios";

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

export const useFetch = (position, lang, type) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const Base = "http://abschlussprojekt.namo/";
  const BaseEn = "http://abschlussprojekt.namo/en/";
  const Query = `wp-json/unc/v2/${type}`;

  //TODO position based fetching, sobald api filterung zulässt
  //(fetching so, dass gar nicht erst unnötige Daten gezogen werden)

  useEffect(() => {
    const source = axios.CancelToken.source();
    setLoading(true);
    axios
      .get(lang === "en" ? BaseEn + Query : Base + Query)
      .then((response) => {
        const filtered = [];
        for (let i = 0; i < response.data.length; i++) {
          if (response.data[i].category === position) {
            filtered.push(response.data[i]);
          }
        }
        setData(filtered);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
    return () => {
      source.cancel();
    };
  }, [position, lang]);

  return { data, loading, error };
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
