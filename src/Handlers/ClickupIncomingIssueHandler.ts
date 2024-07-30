import { Request, Response } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "../../node_modules/interfaces/dist/ITrackingSystemIncomingIssueHandler";

export class ClickupIncomingIssueHandler
  implements ITrackingSystemIncomingIssueHandler
{
  handleIncomingIssue(req: Request): IClientTransformedIssue {
    console.log(req.query.sys);
    throw new Error("Method not implemented.");
  }
}
