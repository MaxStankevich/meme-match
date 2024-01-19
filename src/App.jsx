import { Flex } from "@chakra-ui/react";

import Header from "./components/layout/Header.jsx";
import Footer from "./components/layout/Footer.jsx";
import Main from "./components/layout/Main.jsx";
import "./App.css";

function App() {
  return (
    <Flex direction="column" flex="1">
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}

export default App;
