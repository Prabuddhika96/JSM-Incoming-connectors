import { Request } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
export declare class ClickupIncomingIssueHandler implements ITrackingSystemIncomingIssueHandler {
    configReader: IConfigReader;
    constructor(_configReader: IConfigReader);
    handleIncomingIssue(req: Request): IClientTransformedIssue;
}
//# sourceMappingURL=ClickupIncomingIssueHandler.d.ts.map