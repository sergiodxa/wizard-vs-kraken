import compose from "compose-function";
import App, { Container } from "next/app";
import { Provider } from "react-redux";
import Router from "next/router";
import Head from "next/head";
import withGA from "next-ga";

import withReduxStore from "../lib/with-redux";

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

export default compose(
  withReduxStore,
  withGA("UA-48432002-10", Router)
)(MyApp);
