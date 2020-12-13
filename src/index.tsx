import ReactDOM from "react-dom";

import ApolloClient from "apollo-boost";
import { ApolloProvider } from "@apollo/react-hooks";

import { Tickets } from "./sections";

import "./styles/index.css";

import reportWebVitals from "./reportWebVitals";

const client = new ApolloClient({ uri: "/api" });

ReactDOM.render(
  <ApolloProvider client={client}>
    <Tickets title={"TicketYoga"} />
  </ApolloProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
