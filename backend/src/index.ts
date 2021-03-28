import express, { Request, Response, Application } from "express";
import * as http from "http";
import { randomBytes } from "crypto";

const PORT = 3000;

export default class App {
  private app: Application;
  private server: http.Server;
  private redirects: Record<string, string>;

  constructor() {
    // Initialize Express and HTTP
    this.app = express();

    this.app.use(express.json());
    this.app.use(express.urlencoded());

    this.server = http.createServer(this.app);

    // Initialize end-points
    this.app.post("/api/shorten", (req, res) => this.shorten(req, res));

    this.redirects = {};
  }

  private async shorten(req: Request, res: Response) {
    if (!("url" in req.body)) {
      res.status(400).json({
        Error: 400,
        Message: "Bad request - requires: 'url'",
      });
      return;
    }

    let url = req.body["url"];
    if (!this.isValidURL(url)) {
      res.status(400).json({
        Error: 400,
        Message: "Bad request - 'url' is invalid",
      });
      return;
    }
    let key = this.generateKey();

    this.app.get(`/${key}`, async (_: Request, res: Response) =>
      res.redirect(301, url)
    );
    this.redirects[key] = url;

    res.status(200).json({
      url: `http://localhost:3000/${key}`,
      redirect: url,
    });
  }

  private generateKey(): string {
    let key = randomBytes(4).toString("hex");
    while (key in this.redirects) {
      key = randomBytes(4).toString("hex");
    }
    return key;
  }

  private isValidURL(s: string): boolean {
    let url: URL;
    try {
      url = new URL(s);
    } catch (_) {
      return false;
    }
    let protocol: string = url.protocol.toLowerCase();
    return protocol == "http:" || protocol == "https:";
  }

  public start() {
    this.server.listen(PORT);
    console.log(`Listening on port ${PORT}`);
  }
}

let app = new App();
app.start();
