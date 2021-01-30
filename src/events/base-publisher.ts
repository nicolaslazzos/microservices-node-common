import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

// abstract class for creating publishers for the differents events we are going to handle

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  private client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]) {
    this.client.publish(this.subject, JSON.stringify(data), () => {
      console.log("event published");
    });
  }
}
