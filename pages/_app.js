import ButtonAppBar from "../components/AppBar";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <ButtonAppBar />
      <Component {...pageProps} />)
    </div>
  );
}

export default MyApp;
