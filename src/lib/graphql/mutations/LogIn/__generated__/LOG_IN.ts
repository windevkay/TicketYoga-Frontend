/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { LogInInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: LOG_IN
// ====================================================

export interface LOG_IN_logIn {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
  didRequest: boolean;
}

export interface LOG_IN {
  logIn: LOG_IN_logIn;
}

export interface LOG_INVariables {
  input?: LogInInput | null;
}
