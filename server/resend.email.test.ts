import { describe, it, expect } from "vitest";
import { Resend } from "resend";

describe("Resend API Key", () => {
  it("should have RESEND_API_KEY configured", () => {
    const key = process.env.RESEND_API_KEY;
    expect(key).toBeTruthy();
    expect(key).toMatch(/^re_/);
  });

  it("should be able to instantiate Resend client", () => {
    const key = process.env.RESEND_API_KEY;
    expect(() => new Resend(key)).not.toThrow();
  });
});
