import React from "react";
import { ThemeProvider } from "styled-components";
import themes from "./themes";
import "materialize-css/dist/css/materialize.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "materialize-css";
import CustomRoutes from "./routes";

function App() {
  return (
    <>
        <ThemeProvider theme={themes}>
            <CustomRoutes />
            <ToastContainer />
        </ThemeProvider>
    </>
  );
}

export default App;
