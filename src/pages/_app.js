
import React from "react";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import store, { persistor } from "../setup/store";
import { BaseLayout } from '../components';
import NextRouter from "next/router";
import NProgress from "nprogress"; //nprogress module
import "nprogress/nprogress.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "pretty-checkbox/src/pretty-checkbox.scss";
import '../styles/index.scss'

NProgress.configure({
  minimum: 0.3,
  easing: "ease",
  speed: 800,
  showSpinner: false,
});

NextRouter.events.on("routeChangeStart", () => NProgress.start());
NextRouter.events.on("routeChangeComplete", () => NProgress.done());
NextRouter.events.on("routeChangeError", () => NProgress.done());

const App = ({ Component, pageProps }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BaseLayout>
          <Component {...pageProps} />
        </BaseLayout>
      </PersistGate>
    </Provider>
  );
};

export default App;