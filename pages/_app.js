import App, { Container } from "next/app";
import Head from "next/head";
import React from "react";
import withReduxStore from "../lib/with-redux";
import { Provider } from "react-redux";

class MyApp extends App {
  render() {
    const { Component, pageProps, reduxStore } = this.props;
    return (
      <Container>
        <Head>
          <title>Wizard vs Kraken</title>
        </Head>
        <Provider store={reduxStore}>
          <Component {...pageProps} />
        </Provider>
        <style jsx global>{`
          body {
            margin: 0;
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
              Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
              sans-serif;
          }
        `}</style>
      </Container>
    );
  }
}

export default withReduxStore(MyApp);
