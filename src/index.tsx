import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

import App from "./App";
import { persistor, store } from "./app/store";
import * as serviceWorker from "./serviceWorker";
import GlobalStyles from "./styles/GlobalStyles";
import "./app/i18n";

ReactDOM.render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <GlobalStyles />
        <App />
      </PersistGate>
    </Provider>
  </StrictMode>,
  document.getElementById("root")
);

serviceWorker.unregister();
