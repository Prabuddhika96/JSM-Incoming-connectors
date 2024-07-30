"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickupIncomingIssueHandler = void 0;
class ClickupIncomingIssueHandler {
    constructor(_configReader) {
        this.configReader = _configReader;
    }
    handleIncomingIssue(req) {
        console.log(req.body);
        const { event, webhook_id: webhookId, task_id: taskId } = req.body;
        throw new Error("Method not implemented.");
        // return null;
    }
}
exports.ClickupIncomingIssueHandler = ClickupIncomingIssueHandler;
