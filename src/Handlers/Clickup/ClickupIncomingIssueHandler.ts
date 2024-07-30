import { Request, Response } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";

export class ClickupIncomingIssueHandler
  implements ITrackingSystemIncomingIssueHandler
{
  configReader: IConfigReader;

  constructor(_configReader: IConfigReader) {
    this.configReader = _configReader;
  }

  handleIncomingIssue(req: Request): IClientTransformedIssue {
    console.log(req.body);
    const { event, webhook_id: webhookId, task_id: taskId } = req.body;
    throw new Error("Method not implemented.");
    // return null;
  }
}
