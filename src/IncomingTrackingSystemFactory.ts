import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { ClickupIncomingIssueHandler } from "./Handlers/ClickupIncomingIssueHandler";

export class IncomingTrackingSystemFactory {
  getHandler(
    systemIdentifier: string
  ): ITrackingSystemIncomingIssueHandler | undefined {
    switch (systemIdentifier) {
      case "clickup":
        return new ClickupIncomingIssueHandler();
      default:
        return undefined;
    }
  }
}
