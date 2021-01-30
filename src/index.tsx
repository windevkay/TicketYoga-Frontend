import { useState, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import ApolloClient from "apollo-boost";
import { ApolloProvider, useMutation } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Layout, Affix, Spin } from "antd";

import { LOG_IN } from "./lib/graphql/mutations/LogIn/";
import {
  LOG_IN as LogInData,
  LOG_INVariables,
} from "./lib/graphql/mutations/LogIn/__generated__/LOG_IN";

import { Viewer } from "./lib/types";

import { LoadingIcon } from "./lib/components";

import {
  AppHeader,
  Home,
  CreateEvent,
  Event,
  Events,
  User,
  NotFound,
  Login,
} from "./sections";
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components";
import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
  request: async (operation) => {
    const token = sessionStorage.getItem("token");
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || "",
      },
    });
  },
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LogInData, LOG_INVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token);
        } else {
          sessionStorage.removeItem("token");
        }
      }
    },
  });

  const logInRef = useRef(logIn);
  useEffect(() => {
    logInRef.current();
  }, []);

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin indicator={LoadingIcon} size="large" tip="Loading... 😌" />
        </div>
      </Layout>
    );
  }

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We could not verify your login. Please try again later!" />
  ) : null;

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
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
