"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingTrackingSystemFactory = void 0;
const ClickupIncomingIssueHandler_1 = require("./Handlers/ClickupIncomingIssueHandler");
class IncomingTrackingSystemFactory {
    getHandler(systemIdentifier) {
        switch (systemIdentifier) {
            case "clickup":
                return new ClickupIncomingIssueHandler_1.ClickupIncomingIssueHandler();
            default:
                return null;
        }
    }
}
exports.IncomingTrackingSystemFactory = IncomingTrackingSystemFactory;
