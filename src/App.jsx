import { RouterProvider } from "react-router-dom";
import ContextProvider from "./Components/Helpers/Context";

import { router } from "./Components/Router/Router";

const App = () => {
  return (
    <>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </>
  );
};
export default App;
