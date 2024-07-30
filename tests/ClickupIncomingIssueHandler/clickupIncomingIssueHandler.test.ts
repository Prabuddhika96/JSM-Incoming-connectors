import { expect } from "chai";
import sinon from "sinon";
import { Request } from "express";
import { ClickupIncomingIssueHandler } from "../../src/Handlers/Clickup/ClickupIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
import * as httpUtils from "../../src/utils/http.utils";
import { describe, it, beforeEach } from "mocha";

describe("ClickupIncomingIssueHandler", () => {
  let mockConfigReader: IConfigReader;
  let handler: ClickupIncomingIssueHandler;
  let getRequestStub: sinon.SinonStub;

  beforeEach(() => {
    mockConfigReader = {
      readConfigValue: sinon.stub(),
      getProject: sinon.stub(),
    };
    handler = new ClickupIncomingIssueHandler(mockConfigReader);

    // Stub the getRequest method
    getRequestStub = sinon.stub(httpUtils, "getRequest");
  });

  afterEach(() => {
    getRequestStub.restore();
  });

  describe("handleIncomingIssue", () => {
    it("should return transformed issue for valid request", async () => {
      const req = {
        query: { sys: "clickup" },
        body: { event: "taskUpdated", task_id: "12345", webhook_id: "abcde" },
        project: { defaultJSMPriority: "Medium" },
      } as unknown as Request;

      (mockConfigReader.getProject as sinon.SinonStub).returns(req.project);
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(req.project, "clickupToJsmPriority")
        .returns({ High: "High Priority" });
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(req.project, "clickupAuthorization")
        .returns("mockApiKey");
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(req.project, "clickupApiUrl")
        .returns("mockBaseUrl");

      getRequestStub.resolves({
        json: () => ({
          id: "12345",
          url: "mockUrl",
          name: "mockTask",
          description: "mockDescription",
          priority: { priority: "High" },
        }),
      });

      const transformedIssue = await handler.handleIncomingIssue(req);
      expect(transformedIssue).to.deep.equal({
        id: "12345",
        url: "mockUrl",
        title: "mockTask",
        description: "mockDescription",
        priority: "High Priority",
      });
    });

    it("should throw an error if project is not found", async () => {
      const req = {
        query: { sys: "clickup" },
        body: { event: "taskUpdated", task_id: "12345", webhook_id: "invalid" },
      } as unknown as Request;

      (mockConfigReader.getProject as sinon.SinonStub).returns(null);

      try {
        await handler.handleIncomingIssue(req);
        throw new Error("Expected error not thrown");
      } catch (error: any) {
        expect(error.message).to.equal("Project not found");
      }
    });
  });

  describe("validateRequest", () => {
    it("should validate request and return true if project is found", () => {
      const req = {
        body: { webhook_id: "abcde" },
      } as unknown as Request;

      const mockProject = {};
      (mockConfigReader.getProject as sinon.SinonStub).returns(mockProject);

      const isValid = handler.validateRequest(req);
      expect(isValid).to.be.true;
      expect(req.project).to.equal(mockProject);
    });

    it("should return false if project is not found", () => {
      const req = {
        body: { webhook_id: "invalid" },
      } as unknown as Request;

      (mockConfigReader.getProject as sinon.SinonStub).returns(null);

      const isValid = handler.validateRequest(req);
      expect(isValid).to.be.false;
    });
  });

  describe("getClickupHeadersData", () => {
    it("should return headers and base URL for valid project", () => {
      const mockProject = {};
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(mockProject, "clickupAuthorization")
        .returns("mockApiKey");
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(mockProject, "clickupApiUrl")
        .returns("mockBaseUrl");

      const { baseUrl, headers } = handler.getClickupHeadersData(mockProject);
      expect(baseUrl).to.equal("mockBaseUrl");
      expect(headers).to.deep.equal({
        "Content-Type": "application/json",
        Authorization: "mockApiKey",
      });
    });

    it("should throw an error if credentials are not provided", () => {
      const mockProject = {};
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(mockProject, "clickupAuthorization")
        .returns(null);
      (mockConfigReader.readConfigValue as sinon.SinonStub)
        .withArgs(mockProject, "clickupApiUrl")
        .returns(null);

      expect(() => handler.getClickupHeadersData(mockProject)).to.throw(
        "ClickUp credentials not provided"
      );
    });
  });
});
