import { Subjects } from "./subjects";
import { OrderStatus } from "./types/order-status";

// the event needs the expiration date for the expiration service

// the event needs the orderId, the userId and the price for the payment service

// the event needs the ticketId for the ticket service to update the ticket

// the order status was added just in case...

export interface OrderCreatedEvent {
  subject: Subjects.OrderCreated;
  data: {
    id: string;
    status: OrderStatus;
    userId: string;
    expiresAt: string;
    __v: number;
    ticket: {
      id: string;
      price: number;
    };
  };
}
