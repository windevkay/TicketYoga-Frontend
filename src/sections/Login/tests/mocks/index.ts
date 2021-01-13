import { GraphQLError } from "graphql";

import { AUTH_URL } from "../../../../lib/graphql/queries/AuthUrl";
import { LOG_IN } from "../../../../lib/graphql/mutations/LogIn";

export const authUrlSuccessMock = {
  request: {
    query: AUTH_URL,
  },
  result: {
    data: {
      authUrl: "https://google.com/signin",
    },
  },
};

export const authUrlErrorMock = {
  request: {
    query: AUTH_URL,
  },
  errors: [new GraphQLError("Something went wrong")],
};

export const loginSuccessMock = {
  request: {
    query: LOG_IN,
    variables: {
      input: {
        code: "1234",
      },
    },
  },
  result: {
    data: {
      logIn: {
        id: "1111",
        token: "4321",
        avatar: "image.png",
        hasWallet: false,
        didRequest: true,
      },
    },
  },
};

export const loginErrorMock = {
  request: {
    query: LOG_IN,
    variables: {
      input: {
        code: "1234",
      },
    },
  },
  errors: [new GraphQLError("Something went wrong")],
};
