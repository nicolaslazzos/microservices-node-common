import { Subjects } from "./subjects";

// the event needs the orderId for updating the payment service

// the event needs the ticketId for the ticket service to update the ticket

export interface OrderCancelledEvent {
  subject: Subjects.OrderCancelled;
  data: {
    id: string;
    __v: number;
    ticket: {
      id: string;
    };
  };
}
