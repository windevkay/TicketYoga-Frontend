import { gql } from "apollo-boost";

export const LOG_IN = gql`
  mutation LOG_IN($input: LogInInput) {
    logIn(input: $input) {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
