import { Flex } from "@chakra-ui/react";
import Header from "./layout/Header.jsx";
import Main from "./layout/Main.jsx";
import Footer from "./layout/Footer.jsx";

// import './App.css'

function App() {
  return (
    <Flex
      direction="column"
      flex="1"
      // bgImage="url('/src/assets/background.png')"
      // bgPosition="center"
      // bgRepeat="no-repeat"
      // bgSize="cover"
      // width="full"
      // height="400px"
    >
      <Header />
      <Main />
      <Footer />
    </Flex>
  );
}

export default App;
