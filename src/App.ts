import express from "express";
import { Server } from "http";
import { AddressInfo } from "net";

class App {
  private app: express.Application;
  private port: number | string;
  private server?: Server;

  constructor() {
    this.app = express();
    this.port = 3000;
  }

  public startServer(): void {
    try {
      this.initializeFrontend();
      this.listen();
    } catch (error) {
      console.error(`Error initializing server: ${error}`);
      process.exit(0);
    }
  }

  public initializeFrontend(): void {
    this.app.use(express.static("./frontend/build"));
  }

  private listen(): void {
    this.server = this.app.listen(this.port);
    console.error(`Server listening on port ${this.getServerPort()}`);
  }

  public getServerPort(): number | null {
    const address = this.server?.address();
    if (this.isAddressInfo(address)) {
      return address.port;
    } else {
      throw new Error("Invalid address info -- is the server running?");
    }
  }

  private isAddressInfo(
    address: string | null | undefined | AddressInfo
  ): address is AddressInfo {
    return typeof address === "object";
  }

  public stopServer(): void {
    try {
      this.server.close();
    } catch (error) {
      console.error(`Error shutting down server: ${error}`);
    }
  }
}

export default App;
