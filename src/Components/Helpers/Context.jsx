import React, { createContext, useState, useEffect, useMemo } from "react";
import { useLocalStorage } from "./customHooks";
import Loader from "../Sections/Loader";
import axios from "axios";

export const Context = createContext();

export const ContextProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [lang, setLang] = useLocalStorage("SITE_LANGUAGE", "de");
  const [circlePosition, setCirclePosition] = useLocalStorage(
    "NAV_POSITION",
    "Home"
  );

  //Fetch Data
  const Base = "http://abschlussprojekt.namo/";
  const BaseEn = "http://abschlussprojekt.namo/en/";
  const Queries = [
    `wp-json/unc/v2/pages`,
    `wp-json/unc/v2/posts`,
    `wp-json/unc/v2/media`,
  ];

  useMemo(() => {
    const source = axios.CancelToken.source();
    let responseDataArray = [];
    setLoading(true);

    const requests = Queries.map((query) =>
      axios.get(lang === "en" ? BaseEn + query : Base + query)
    );
    axios
      .all(requests)
      .then((responses) => {
        responses.forEach((response, index) => {
          responseDataArray.push(response.data);
        });
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setData(responseDataArray);
        setLoading(false);
      });

    return () => {
      source.cancel();
    };
  }, []);

  if (loading) return <Loader />;

  if (error) console.log(error);

  return (
    <Context.Provider
      value={[lang, setLang, circlePosition, setCirclePosition, data]}>
      {children}
    </Context.Provider>
  );
};
export default ContextProvider;
