import React from "react";
import { Switch, withRouter, Route } from "react-router-dom";
//import Home from "./Pages/Home/home";
const Home = React.lazy(() => import("./Pages/Home/home"));

const renderLoader = () => {
    return <div></div>;
  };

const Main = () => (
    <React.Suspense fallback={renderLoader()}>
            <Route exact path="/" component={Home}></Route>
    </React.Suspense>

);
export default withRouter(Main);