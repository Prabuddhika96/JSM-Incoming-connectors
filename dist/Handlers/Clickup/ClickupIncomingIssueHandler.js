"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickupIncomingIssueHandler = void 0;
const ClickupEndPoints_1 = require("./ClickupEndPoints");
const http_utils_1 = require("../../utils/http.utils");
class ClickupIncomingIssueHandler {
    constructor(_configReader) {
        this.configReader = _configReader;
    }
    handleIncomingIssue(req) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (this.validateRequest(req) === false) {
                    throw new Error("Project not found");
                }
                const { event, task_id: taskId } = req.body;
                const { baseUrl, headers } = this.getClickupHeadersData(req.project);
                const url = `${baseUrl}${ClickupEndPoints_1.clickupEndPoints.clickupTaskUrl}/${taskId}`;
                const clickupTaskDetails = yield (0, http_utils_1.getRequest)(url, headers)
                    .then((res) => {
                    return res.json();
                })
                    .then((res) => {
                    if (!res) {
                        throw new Error("Task not found");
                    }
                    else {
                        const project = req.project;
                        const clickupPriorities = this.configReader.readConfigValue(project, "clickupToJsmPriority");
                        const jsmTask = {
                            id: res.id,
                            url: res.url,
                            title: res.name,
                            description: res.description,
                            priority: clickupPriorities[res.priority.priority]
                                ? clickupPriorities[res.priority.priority]
                                : project.defaultJSMPriority,
                        };
                        return jsmTask;
                    }
                })
                    .catch((error) => {
                    throw new Error(error.message);
                });
                return clickupTaskDetails;
            }
            catch (e) {
                throw new Error(e.message);
            }
        });
    }
    validateRequest(req) {
        const { webhook_id: webhookId } = req.body;
        const project = this.configReader.getProject("clickupWebhookId", webhookId);
        if (project) {
            req.project = project;
            return true;
        }
        return false;
    }
    getClickupHeadersData(project) {
        const apiKey = this.configReader.readConfigValue(project, "clickupAuthorization");
        const baseUrl = this.configReader.readConfigValue(project, "clickupApiUrl");
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
exports.ClickupIncomingIssueHandler = ClickupIncomingIssueHandler;
