import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { ClickupIncomingIssueHandler } from "./Handlers/ClickupIncomingIssueHandler";

export class IncomingTrackingSystemFactory {
  getHandler(systemIdentifier: string): ITrackingSystemIncomingIssueHandler {
    if (systemIdentifier === "clickup") {
      return new ClickupIncomingIssueHandler();
    } else {
      throw new Error("Invalid service type");
    }
  }
}
