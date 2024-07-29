"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingTrackingSystemFactory = void 0;
const ClickupIncomingIssueHandler_1 = require("./Handlers/ClickupIncomingIssueHandler");
class IncomingTrackingSystemFactory {
    getHandler(systemIdentifier) {
        if (systemIdentifier === "clickup") {
            return new ClickupIncomingIssueHandler_1.ClickupIncomingIssueHandler();
        }
        else {
            throw new Error("Invalid service type");
        }
    }
}
exports.IncomingTrackingSystemFactory = IncomingTrackingSystemFactory;
