import { Route, Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/react-testing";

import { Login } from "../index";
import {
  authUrlSuccessMock,
  authUrlErrorMock,
  loginSuccessMock,
  loginErrorMock,
} from "./mocks";
import { LogInMessages } from "../messages";

const defaultProps = {
  setViewer: () => {},
};

describe("Login", () => {
  //window.scrollTo = () => {};
  describe("AUTH_URL Query", () => {
    it("redirects to Google login page when query is successful", async () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: {
          assign: jest.fn(),
          hash: {
            includes: jest.fn(),
            endsWith: jest.fn(),
          },
        },
      });

      const history = createMemoryHistory({
        initialEntries: ["/login"],
      });
      const { queryByText, getByRole } = render(
        <MockedProvider mocks={[authUrlSuccessMock]} addTypename={false}>
          <Router history={history}>
            <Route path="/login">
              <Login {...defaultProps} />
            </Route>
          </Router>
        </MockedProvider>
      );

      const authUrlButton = getByRole("button");
      fireEvent.click(authUrlButton);

      await waitFor(() => {
        // assert redirect function was called with correct args
        expect(window.location.assign).toHaveBeenCalledWith(
          authUrlSuccessMock.result.data.authUrl
        );
        // assert error message is not visible on screen
        expect(queryByText(LogInMessages.LOGIN_ERROR)).toBeNull();
      });
    });

    it("renders an error message if auth url query is unsuccessful", async () => {
      Object.defineProperty(window, "location", {
        writable: true,
        value: {
          assign: jest.fn(),
          hash: {
            includes: jest.fn(),
            endsWith: jest.fn(),
          },
        },
      });

      const history = createMemoryHistory({
        initialEntries: ["/login"],
      });
      const { queryByText, getByRole } = render(
        <MockedProvider mocks={[authUrlErrorMock]} addTypename={false}>
          <Router history={history}>
            <Route path="/login">
              <Login {...defaultProps} />
            </Route>
          </Router>
        </MockedProvider>
      );

      const authUrlButton = getByRole("button");
      fireEvent.click(authUrlButton);

      await waitFor(() => {
        // assert redirect function isnt called with  args
        expect(window.location.assign).not.toHaveBeenCalledWith(
          authUrlSuccessMock.result.data.authUrl
        );
        // assert error message is visible on screen
        expect(queryByText(LogInMessages.LOGIN_ERROR)).not.toBeNull();
      });
    });
  });

  describe("LOGIN Mutation", () => {
    it("will not fire the Login mutation and redirect to User page if there is no code param in URL", async () => {
      const history = createMemoryHistory({
        initialEntries: ["/login"],
      });
      <MockedProvider mocks={[loginSuccessMock]} addTypename={false}>
        <Router history={history}>
          <Route path="/login">
            <Login {...defaultProps} />
          </Route>
        </Router>
      </MockedProvider>;

      await waitFor(() => {
        // assert that even though it is a success mock, redirect to user page doesnt happen
        expect(history.location.pathname).not.toBe("/user/1111");
      });
    });

    describe("When Code param exists in URL", () => {
      it("redirects to User page when mutation is successful", async () => {
        // include code param in url
        const history = createMemoryHistory({
          initialEntries: ["/login?code=1234"],
        });
        <MockedProvider mocks={[loginSuccessMock]} addTypename={false}>
          <Router history={history}>
            <Route path="/login">
              <Login {...defaultProps} />
            </Route>
          </Router>
        </MockedProvider>;

        await waitFor(() => {
          // assert redirect to user page happens
          expect(history.location.pathname).toBe("/user/1111");
        });
      });

      it("does not redirect and displays Error message if mutation failed", async () => {
        const history = createMemoryHistory({
          initialEntries: ["/login?code=1234"],
        });
        const { queryByText } = render(
          <MockedProvider mocks={[loginErrorMock]} addTypename={false}>
            <Router history={history}>
              <Route path="/login">
                <Login {...defaultProps} />
              </Route>
            </Router>
          </MockedProvider>
        );

        await waitFor(() => {
          // assert redirect to user page happens
          expect(history.location.pathname).not.toBe("/user/1111");
          expect(queryByText(LogInMessages.LOGIN_ERROR)).not.toBeNull();
        });
      });
    });
  });
});
