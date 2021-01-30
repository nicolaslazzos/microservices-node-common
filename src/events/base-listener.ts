import { Stan, Message } from "node-nats-streaming";
import { Subjects } from "./subjects";

// abstract class for creating listeners for the differents events we are going to handle

interface Event {
  subject: Subjects;
  data: any;
}

abstract class Listener<T extends Event> {
  // abstracts must be implemented by the class

  // a subject is like a channel name
  abstract subject: T["subject"];
  abstract queueGroupName: string;
  abstract onMessage(data: T["data"], msg: Message): void;

  private client: Stan;

  // protected means that the subclass can define it if it wants to
  protected ackWait = 5 * 1000;

  constructor(client: Stan) {
    this.client = client;
  }

  subscriptionOptions() {
    return (
      this.client
        .subscriptionOptions()
        // to get all the events emitted in this channel when we subscribe it for the first time
        .setDeliverAllAvailable()
        // to manually send the ack to confirm that the event was successfully processed, otherwise, the event is re-emitted
        .setManualAckMode(true)
        // how much time to wait the ack before re-emitting the event
        .setAckWait(this.ackWait)
        // a durable name is useful for the channel to remember the events that we have processed before, so if the client disconnects and the connects again, only the not processed events will be sent
        .setDurableName(this.queueGroupName)
    );
  }

  listen() {
    const subscription = this.client.subscribe(
      this.subject,
      this.queueGroupName,
      this.subscriptionOptions()
    );

    subscription.on("message", (msg: Message) => {
      console.log(
        `Message received from: ${this.subject} / ${this.queueGroupName}`
      );

      const parsedData = this.parseMessage(msg);

      this.onMessage(parsedData, msg);
    });
  }

  parseMessage(msg: Message) {
    const data = msg.getData();

    // handling if we are receiving a string or a buffer in the message
    return typeof data === "string"
      ? JSON.parse(data)
      : JSON.parse(data.toString("utf8"));
  }
}

export { Listener };
