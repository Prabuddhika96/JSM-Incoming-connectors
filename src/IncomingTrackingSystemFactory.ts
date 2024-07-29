import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { ClickupIncomingIssueHandler } from "./Handlers/ClickupIncomingIssueHandler";

export class IncomingTrackingSystemFactory {
  getHandler(
    systemIdentifier: string
  ): ITrackingSystemIncomingIssueHandler | null {
    if (systemIdentifier === "clickup") {
      return new ClickupIncomingIssueHandler();
    }
    return null; // Return null instead of undefined if no handler is found
  }
}
