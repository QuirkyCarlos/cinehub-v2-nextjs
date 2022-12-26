import "../styles/globals.css";
import "../styles/nprogress.css"
import { ChakraProvider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
const ProgressBar = dynamic(() => import("../components/utils/ProgressBar"));

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <ProgressBar />
        <div className="font-montserrat">
        <Component {...pageProps} />
        </div>
    </ChakraProvider>
  );
}

export default MyApp;
