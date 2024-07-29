import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "../../node_modules/interfaces/dist/ITrackingSystemIncomingIssueHandler";

export class ClickupIncomingIssueHandler
  implements ITrackingSystemIncomingIssueHandler
{
  handleIncomingIssue(req: Request): IClientTransformedIssue {
    throw new Error("Method not implemented.");
  }
}
