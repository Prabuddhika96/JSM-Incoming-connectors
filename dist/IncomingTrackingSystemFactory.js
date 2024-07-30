"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IncomingTrackingSystemFactory = void 0;
const ClickupIncomingIssueHandler_1 = require("./Handlers/Clickup/ClickupIncomingIssueHandler");
class IncomingTrackingSystemFactory {
    constructor(_configReader) {
        this.configReader = _configReader;
    }
    getHandler(systemIdentifier) {
        if (systemIdentifier === "clickup") {
            return new ClickupIncomingIssueHandler_1.ClickupIncomingIssueHandler(this.configReader);
        }
        else {
            throw new Error("Invalid service type");
        }
    }
}
exports.IncomingTrackingSystemFactory = IncomingTrackingSystemFactory;
