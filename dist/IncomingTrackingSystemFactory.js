"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingTrackingSystemFactory = void 0;
const ClickupIncomingIssueHandler_1 = require("./Handlers/ClickupIncomingIssueHandler");
class IncomingTrackingSystemFactory {
    getHandler(systemIdentifier) {
        if (systemIdentifier === "clickup") {
            return new ClickupIncomingIssueHandler_1.ClickupIncomingIssueHandler();
        }
        return null; // Return null instead of undefined if no handler is found
    }
}
exports.IncomingTrackingSystemFactory = IncomingTrackingSystemFactory;
