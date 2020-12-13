import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import { List } from "antd";

import { TICKETS as TicketsData } from "./__generated__/TICKETS";

import "./styles/index.css";

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
    <List
      itemLayout="horizontal"
      dataSource={tickets}
      renderItem={(ticket) => (
        <List.Item>
          <List.Item.Meta
            title={ticket.ticketCategory}
            description={ticket.price}
          />
        </List.Item>
      )}
    />
  ) : null;

  if (loading) {
    return <h2>loading...</h2>;
  }

  if (error) {
    return <h2>error...</h2>;
  }

  return (
    <div className="tickets">
      <h2>{title}</h2>
      {ticketList}
    </div>
  );
};
