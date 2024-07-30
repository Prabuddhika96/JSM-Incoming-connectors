import { expect } from "chai";
import { IncomingTrackingSystemFactory } from "incoming/dist/IncomingTrackingSystemFactory";
import { ClickupIncomingIssueHandler } from "incoming/dist/Handlers/Clickup/ClickupIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
import { describe, it } from "node:test";

describe("IncomingTrackingSystemFactory", () => {
  const mockConfigReader: IConfigReader = {
    readConfigValue: (project: any, key: string) => {},
    getProject: (key: string, value: string) => {},
  };

  it('should return ClickupIncomingIssueHandler for "clickup" systemIdentifier', () => {
    const factory = new IncomingTrackingSystemFactory(mockConfigReader);
    const handler = factory.getHandler("clickup");
    expect(handler).to.be.instanceOf(ClickupIncomingIssueHandler);
  });

  it("should throw an error for an invalid systemIdentifier", () => {
    const factory = new IncomingTrackingSystemFactory(mockConfigReader);
    expect(() => factory.getHandler("jira")).to.throw("Invalid service type");
  });
});
