import React from "react";
import createStore from "./store";

const isServer = typeof window === "undefined";
const REDUX_STORE = "REDUX_STORE";

function initStore(initialState) {
  if (isServer) {
    return createStore({ initialState });
  }

  if (!window[REDUX_STORE]) {
    window[REDUX_STORE] = createStore({ initialState });
  }
  return window[REDUX_STORE];
}

export default App => {
  return class AppWithRedux extends React.Component {
    static async getInitialProps(appContext) {
      const reduxStore = initStore();

      appContext.ctx.reduxStore = reduxStore;

      const appProps = typeof App.getInitialProps === "function"
        ? await App.getInitialProps(appContext)
        : {}

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      };
    }

    constructor(props) {
      super(props);
      this.reduxStore = initStore(props.initialReduxState);
    }

    render() {
      return <App {...this.props} reduxStore={this.reduxStore} />;
    }
  };
};
