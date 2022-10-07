import { HttpStatusCode } from "./../node_modules/axios/index.d";
import { IntegrationBase } from "@budibase/types";
import fetch from "node-fetch";

interface Query {
  method: string;
  body?: string;
  headers?: { [key: string]: string };
}

interface jsonObj {
  sql: string;
}

class CustomIntegration implements IntegrationBase {
  private readonly url: string;
  private readonly database: string;

  constructor(config: { url: string; database: string }) {
    this.url = config.url;
    this.database = config.database;
  }

  async create(query: { json: object }) {}

  async read(query: { queryString: string }) {}

  async update(query: { json: object }) {}

  async delete(query: { id: string }) {}

  async consultar(query: { json: jsonObj }) {
    const path = this.url + "/api/consultar/v3";
    const obj = {
      database: this.database,
      sql: Buffer.from(query.json.sql).toString("base64"),
    };

    const response = await fetch(path, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    });
    const data = await response.json();
    return data;
  }

  async executar(query: { json: jsonObj }) {
    const path = this.url + "/api/executar/v3";
    const obj = {
      database: this.database,
      lista: [Buffer.from(query.json.sql).toString("base64")],
    };

    const response: any = await fetch(path, {
      method: "post",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json;charset=UTF-8",
        Accept: "application/json",
      },
    });

    if (response.ok) {
      return { mensagem: "executado com sucesso!" };
    } else {
      throw new Error(response);
    }
  }
}

export default CustomIntegration;
