import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { Home, CreateEvent, Event, Events, User, NotFound } from "./sections";
import "./styles/index.css";

const client = new ApolloClient({ uri: "/api" });

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/createevent" component={CreateEvent} />
        <Route exact path="/event/:id" component={Event} />
        <Route exact path="/events/:location?" component={Events} />
        <Route exact path="/user/:id" component={User} />
        <Route component={NotFound} />
      </Switch>
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
