import { RouterProvider } from "react-router-dom";
import HeaderContextProvider from "./Components/Helpers/HeaderContext";
import { router } from "./Components/Router/Router";
import Error from "./Components/Error";

const App = ({ children }) => {
  return (
    <>
      <HeaderContextProvider>
        <RouterProvider router={router} />
      </HeaderContextProvider>
    </>
  );
};
export default App;
