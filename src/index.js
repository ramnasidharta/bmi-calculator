import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { IntlProvider, FormattedMessage } from 'react-intl';
import { i18nConfig, language } from "./i18n.js";
import App from "./components/App/App.jsx";


ReactDOM.render(
  <IntlProvider
    locale={language}
    defaultLocale={i18nConfig.defaultLocale}
    messages={i18nConfig.messages[language]}
  >
    <App />
  </IntlProvider>,
  document.getElementById("root")
);
