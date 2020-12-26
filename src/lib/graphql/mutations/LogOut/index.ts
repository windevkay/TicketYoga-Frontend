import { gql } from "apollo-boost";

export const LOG_OUT = gql`
  mutation LOG_OUT {
    logOut {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`;
