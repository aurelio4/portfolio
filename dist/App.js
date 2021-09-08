"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
class App {
    constructor() {
        this.app = express_1.default();
        this.port = 3000;
    }
    startServer() {
        try {
            this.initializeFrontend();
            this.listen();
        }
        catch (error) {
            console.error(`Error initializing server: ${error}`);
            process.exit(0);
        }
    }
    initializeFrontend() {
        this.app.use(express_1.default.static("./frontend/build"));
    }
    listen() {
        this.server = this.app.listen(this.port);
        console.error(`Server listening on port ${this.getServerPort()}`);
    }
    getServerPort() {
        var _a;
        const address = (_a = this.server) === null || _a === void 0 ? void 0 : _a.address();
        if (this.isAddressInfo(address)) {
            return address.port;
        }
        else {
            throw new Error("Invalid address info -- is the server running?");
        }
    }
    isAddressInfo(address) {
        return typeof address === "object";
    }
    stopServer() {
        try {
            this.server.close();
        }
        catch (error) {
            console.error(`Error shutting down server: ${error}`);
        }
    }
}
exports.default = App;
//# sourceMappingURL=App.js.map