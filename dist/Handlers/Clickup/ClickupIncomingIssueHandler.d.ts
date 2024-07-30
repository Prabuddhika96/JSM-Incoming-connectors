import { Request } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
export declare class ClickupIncomingIssueHandler implements ITrackingSystemIncomingIssueHandler {
    handleIncomingIssue(req: Request): IClientTransformedIssue;
}
//# sourceMappingURL=ClickupIncomingIssueHandler.d.ts.map