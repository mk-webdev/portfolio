import { createContext } from "react";
import { useLocalStorage, useFetch } from "./customHooks";
import Loader from "../Sections/Loader";

export const HeaderContext = createContext();
export const HeaderContextProvider = ({ children }) => {
  const [lang, setLang] = useLocalStorage("SITE_LANGUAGE", "de");
  const [circlePosition, setCirclePosition] = useLocalStorage(
    "NAV_POSITION",
    "Home"
  );

  const { data, loading, error } = useFetch(circlePosition, lang, "pages");

  if (loading) return <Loader />;

  if (error) console.log(error);

  return (
    <HeaderContext.Provider
      value={[lang, setLang, circlePosition, setCirclePosition, data]}>
      {children}
    </HeaderContext.Provider>
  );
};
export default HeaderContextProvider;
