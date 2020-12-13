/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { TicketCategory } from "./../../../../__generated__/globalTypes";

// ====================================================
// GraphQL query operation: TICKETS
// ====================================================

export interface TICKETS_getTickets {
  __typename: "Ticket";
  validity: boolean;
  price: number;
  ticketCategory: TicketCategory;
  transferable: boolean;
}

export interface TICKETS {
  getTickets: TICKETS_getTickets[] | null;
}
