export enum OrderStatus {
  // when the order has been created but the ticket it is trying to order has not been reserved yet
  Created = "created",
  // when the ticket is trying to reserve is already been reserved, the user cancelled the order or the order has expired before payment
  Cancelled = "cancelled",
  // when the order has successfully reserved the ticket
  AwaitingPayment = "awaiting:payment",
  // when the user has reserved the ticket and provided the payment successfully
  Complete = "complete",
}
