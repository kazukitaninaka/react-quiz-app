import Head from "next/head";
import { AppProps } from "next/app";
import "../index.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Container } from "@material-ui/core";

export default function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <>
      <Head>
        <title>Quiz Game!</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        <Header />
        <div style={{ flex: "1" }}>
          <Container maxWidth="sm">
            <Component {...pageProps} />
          </Container>
        </div>
        <Footer />
      </div>
    </>
  );
}
