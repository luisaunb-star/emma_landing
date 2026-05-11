import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock do Anthropic SDK para não fazer chamadas reais à API
vi.mock("@anthropic-ai/sdk", () => {
  return {
    default: vi.fn().mockImplementation(() => ({
      messages: {
        create: vi.fn().mockResolvedValue({
          content: [{ type: "text", text: "Olá! Sou a Emma, sua assistente virtual de saúde. Como posso ajudar?" }],
        }),
      },
    })),
  };
});

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
  it("retorna uma resposta com a estrutura correta", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      message: "Olá, Emma! Este é um teste.",
    });

    expect(result).toHaveProperty("output");
    expect(typeof result.output).toBe("string");
    expect(result.output.length).toBeGreaterThan(0);
  });

  it("retorna waitlistData como null em respostas normais", async () => {
    const ctx = createTestContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.sendMessage({
      message: "O que é a Emma?",
    });

    expect(result.waitlistData).toBeNull();
  });
});
