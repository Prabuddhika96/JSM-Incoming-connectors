import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
export declare class IncomingTrackingSystemFactory {
    configReader: IConfigReader;
    constructor(_configReader: IConfigReader);
    getHandler(systemIdentifier: string): ITrackingSystemIncomingIssueHandler;
}
//# sourceMappingURL=IncomingTrackingSystemFactory.d.ts.map