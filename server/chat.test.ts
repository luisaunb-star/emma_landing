import { describe, expect, it } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

function createTestContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: () => {},
    } as TrpcContext["res"],
  };
}

describe("chat.sendMessage", () => {
  it("valida a chave de API do Claude e retorna uma resposta", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      message: "Olá, Emma! Este é um teste.",
    });

    expect(result).toHaveProperty("output");
    expect(typeof result.output).toBe("string");
    expect(result.output.length).toBeGreaterThan(0);
  }, 30000); // Timeout de 30s para a API externa
});
