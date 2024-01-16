import * as React from "react";
import { ChakraProvider } from "@chakra-ui/react";
import * as ReactDOM from "react-dom/client";

import App from "./App.jsx";
// import theme from './theme.js'
// import './index.css'

const rootElement = document.getElementById("root");
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <ChakraProvider /* theme={theme} */>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
);