import { useState } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout } from "antd";

import { Viewer } from "./lib/types";

import {
  Home,
  CreateEvent,
  Event,
  Events,
  User,
  NotFound,
  Login,
} from "./sections";
import "./styles/index.css";

const client = new ApolloClient({ uri: "/api" });

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/createevent" component={CreateEvent} />
          <Route exact path="/event/:id" component={Event} />
          <Route exact path="/events/:location?" component={Events} />
          <Route exact path="/user/:id" component={User} />
          <Route exact path="/login">
            <Login setViewer={setViewer} />
          </Route>
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  );
};

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);

reportWebVitals();
