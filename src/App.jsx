import { RouterProvider } from "react-router-dom";
import ContextProvider from "./Components/Helpers/Context";
import { router } from "./Components/Router/Router";
import Error from "./Components/Error";

const App = ({ children }) => {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
};
export default App;
