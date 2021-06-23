import React from 'react';
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import Routes from "./routes";
import { BrowserRouter } from "react-router-dom";
import { createBrowserHistory } from "history";
import GlobalContainer from "./components/core/GlobalContainer";
import Header from "./components/header/header"


ReactDOM.render(
  <BrowserRouter basename='/s001-Helman'>
     <GlobalContainer>
        <Header></Header>
        <div className="container">
            <Routes />
        </div>
     </GlobalContainer>
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
