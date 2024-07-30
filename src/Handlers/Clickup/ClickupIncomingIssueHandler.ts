import { Request, Response } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";

export class ClickupIncomingIssueHandler
  implements ITrackingSystemIncomingIssueHandler
{
  handleIncomingIssue(req: Request): IClientTransformedIssue {
    console.log(req.body);
    throw new Error("Method not implemented.");
    // return null;
  }
}
