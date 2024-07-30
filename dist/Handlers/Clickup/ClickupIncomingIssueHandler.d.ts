import { Request } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
declare module "express-serve-static-core" {
    interface Request {
        project?: any;
        webhookEvent?: string;
    }
}
export declare class ClickupIncomingIssueHandler implements ITrackingSystemIncomingIssueHandler {
    configReader: IConfigReader;
    constructor(_configReader: IConfigReader);
    handleIncomingIssue(req: Request): Promise<IClientTransformedIssue>;
    validateRequest(req: Request): boolean;
    getClickupHeadersData(project: any): {
        baseUrl: string;
        headers: {
            "Content-Type": string;
            Authorization: string;
        };
    };
}
//# sourceMappingURL=ClickupIncomingIssueHandler.d.ts.map