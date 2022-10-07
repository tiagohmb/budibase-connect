import axios from "axios";
import https from "https";

class CustomIntegration {
  private readonly url: string;
  private readonly database: string;
  private readonly agent: https.Agent;

  constructor(config: { url: string; database: string }) {
    this.url = config.url;
    this.database = config.database;
    this.agent = new https.Agent({
      rejectUnauthorized: false,
    });
  }

  request(url: string) {
    const instance = axios.create({
      baseURL: this.url,
      httpsAgent: this.agent,
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    });
    return instance;
  }

  async consultar(query: { sql: String }) {
    const obj = {
      database: this.database,
      sql: Buffer.from(query.sql).toString("base64"),
    };
    return this.request(this.url).post("/consultar/v3", JSON.stringify(obj));
  }

  async executar(query: { sql: String }) {
    const obj = {
      database: this.database,
      lista: [Buffer.from(query.sql).toString("base64")],
    };
    return this.request(this.url).post("/executar/v3", JSON.stringify(obj));
  }
}

export default CustomIntegration;
