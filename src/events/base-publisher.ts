import { Stan } from "node-nats-streaming";
import { Subjects } from "./subjects";

// abstract class for creating publishers for the differents events we are going to handle

interface Event {
  subject: Subjects;
  data: any;
}

export abstract class Publisher<T extends Event> {
  abstract subject: T["subject"];

  // protected makes it accessible to the child class
  protected client: Stan;

  constructor(client: Stan) {
    this.client = client;
  }

  publish(data: T["data"]): Promise<void> {
    return new Promise((resolve, reject) => {
      this.client.publish(this.subject, JSON.stringify(data), (err) => {
        if (err) reject();

        console.log("Event published to subject:", this.subject);

        resolve();
      });
    });
  }
}
