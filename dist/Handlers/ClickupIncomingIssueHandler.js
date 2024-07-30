"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClickupIncomingIssueHandler = void 0;
class ClickupIncomingIssueHandler {
    handleIncomingIssue(req) {
        console.log(req.query.sys);
        throw new Error("Method not implemented.");
    }
}
exports.ClickupIncomingIssueHandler = ClickupIncomingIssueHandler;
