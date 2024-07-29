import { ClickupIncomingIssueHandler } from "./Handlers/ClickupIncomingIssueHandler";

export class IncomingTrackingSystemFactory {
  getHandler(systemIdentifier: string) {
    switch (systemIdentifier) {
      case "clickup":
        return new ClickupIncomingIssueHandler();
      default:
        return null;
    }
  }
}
