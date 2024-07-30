import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { ClickupIncomingIssueHandler } from "./Handlers/Clickup/ClickupIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";

export class IncomingTrackingSystemFactory {
  configReader: IConfigReader;

  constructor(_configReader: IConfigReader) {
    this.configReader = _configReader;
  }

  getHandler(systemIdentifier: string): ITrackingSystemIncomingIssueHandler {
    if (systemIdentifier === "clickup") {
      return new ClickupIncomingIssueHandler(this.configReader);
    } else {
      throw new Error("Invalid service type");
    }
  }
}
