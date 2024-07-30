import { Request, Response } from "express";
import { IClientTransformedIssue } from "interfaces/dist/IClientTransformedIssue";
import { ITrackingSystemIncomingIssueHandler } from "interfaces/dist/ITrackingSystemIncomingIssueHandler";
import { IConfigReader } from "interfaces/dist/IConfigReade";
import { clickupEndPoints } from "./ClickupEndPoints";
import { getRequest } from "../../utils/http.utils";

declare module "express-serve-static-core" {
  interface Request {
    project?: any;
    webhookEvent?: string;
  }
}

export class ClickupIncomingIssueHandler
  implements ITrackingSystemIncomingIssueHandler
{
  configReader: IConfigReader;

  constructor(_configReader: IConfigReader) {
    this.configReader = _configReader;
  }

  async handleIncomingIssue(req: Request): Promise<IClientTransformedIssue> {
    try {
      if (this.validateRequest(req) === false) {
        throw new Error("Project not found");
      }

      const { event, task_id: taskId } = req.body;
      const { baseUrl, headers } = this.getClickupHeadersData(req.project);
      const url = `${baseUrl}${clickupEndPoints.clickupTaskUrl}/${taskId}`;

      const clickupTaskDetails = await getRequest(url, headers).then(
        (res: any) => {
          return res.json();
        }
      );
      //   .then((res: any) => {
      //     if (!res) {
      //       throw new Error("Task not found");
      //     } else {
      //       const project = req.project;
      //       const clickupPriorities = this.configReader.readConfigValue(
      //         project,
      //         "clickupToJsmPriority"
      //       );

      //       const jsmTask: IClientTransformedIssue = {
      //         id: res.id,
      //         url: res.url,
      //         title: res.name,
      //         description: res.description,
      //         priority: clickupPriorities[res.priority.priority]
      //           ? clickupPriorities[res.priority.priority]
      //           : project.defaultJSMPriority,
      //       };
      //       console.log(jsmTask);
      //       return jsmTask;
      //     }
      //   })
      //   .catch((error: any) => {
      //     throw new Error(error.message);
      //   });

      // return clickupTaskDetails;

      if (!clickupTaskDetails) {
        throw new Error("Task not found");
      }
      const project = req.project;
      const clickupPriorities = this.configReader.readConfigValue(
        project,
        "clickupToJsmPriority"
      );

      const jsmTask: IClientTransformedIssue = {
        id: clickupTaskDetails.id,
        url: clickupTaskDetails.url,
        title: clickupTaskDetails.name,
        description: clickupTaskDetails.description,
        priority: clickupPriorities[clickupTaskDetails.priority.priority]
          ? clickupPriorities[clickupTaskDetails.priority.priority]
          : project.defaultJSMPriority,
      };
      console.log(jsmTask);
      return jsmTask;
    } catch (e: any) {
      throw new Error(e.message);
    }
  }

  validateRequest(req: Request): boolean {
    const { webhook_id: webhookId } = req.body;
    const project = this.configReader.getProject("clickupWebhookId", webhookId);
    if (project) {
      req.project = project;
      return true;
    }
    return false;
  }

  getClickupHeadersData(project: any) {
    const apiKey: string | undefined = this.configReader.readConfigValue(
      project,
      "clickupAuthorization"
    );
    const baseUrl: string = this.configReader.readConfigValue(
      project,
      "clickupApiUrl"
    );

    if (!apiKey || !baseUrl) {
      throw new Error("ClickUp credentials not provided");
    }

    const headers = {
      "Content-Type": "application/json",
      Authorization: apiKey,
    };

    return { baseUrl: baseUrl, headers: headers };
  }
}
