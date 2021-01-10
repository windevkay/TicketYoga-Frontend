import { GraphQLError } from "graphql";

import { AUTH_URL } from "../../../../lib/graphql/queries/AuthUrl";

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
