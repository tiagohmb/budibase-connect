import { default as HTTP } from "../src";
import { describe, it, beforeAll, expect } from "@jest/globals";

describe("test the query types", () => {
  let integration: any;
  beforeAll(() => {
    integration = new HTTP.integration({
      url: "http://192.168.1.11:5010",
      database:
        "192.168.1.11/3060:C:workspace_Producaodatabasescg-win.producao.atacamax.fdb",
    });
  });

  async function catchError(cb: any) {
    let error: any;
    try {
      await cb();
    } catch (err: any) {
      error = err.message;
    }
    expect(error).not.toBeNull();
  }

  it("consultando unidade", async () => {
    await catchError(() => {
      return integration.consultar({
        sql: "select * from unidade",
      });
    });
  });

  it("should run the read query", async () => {
    await catchError(() => {
      return integration.executar({
        sql: "update unidade set codunidade=codunidade",
      });
    });
  });
});
