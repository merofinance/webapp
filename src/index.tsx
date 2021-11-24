import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";

import App from "./App";
import { persistor, store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import GlobalStyles from "./styles/GlobalStyles";
import "./app/i18n";

Sentry.init({
  dsn: "https://9fd2185cc2324102a9908544a0ac8c92@o1016790.ingest.sentry.io/5982223",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
