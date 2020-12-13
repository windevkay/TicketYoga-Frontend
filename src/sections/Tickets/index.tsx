import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { TICKETS as TicketsData } from "./__generated__/TICKETS";

const TICKETS = gql`
  query TICKETS {
    getTickets {
      validity
      price
      ticketCategory
      transferable
    }
  }
`;

interface Props {
  title: string;
}

export const Tickets = ({ title }: Props) => {
  const { data, loading, error } = useQuery<TicketsData>(TICKETS);
  const tickets = data ? data.getTickets : null;
  const ticketList = tickets ? (
    <ul>
      {tickets.map((ticket) => {
        return <li key={ticket.price}>{ticket.ticketCategory}</li>;
      })}
    </ul>
  ) : null;

  if (loading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>error...</h2>;
  }

  return (
    <div>
      <h2>{title}</h2>
      {ticketList}
    </div>
  );
};
