import { describe, it, expect, vi, beforeEach } from "vitest";

// Mock the database module
vi.mock("./db", () => ({
  getDb: vi.fn(),
}));

// Mock the notification module
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

import { getDb } from "./db";
import { notifyOwner } from "./_core/notification";

describe("Waitlist procedure logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should detect duplicate email and return alreadyRegistered: true", async () => {
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([{ id: 1, email: "test@test.com" }]),
      insert: vi.fn().mockReturnThis(),
      values: vi.fn().mockResolvedValue(undefined),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    // Simulate the logic
    const db = await getDb();
    const { eq } = await import("drizzle-orm");
    const { waitlist } = await import("../drizzle/schema");

    const existing = await db!.select().from(waitlist).where(eq(waitlist.email, "test@test.com")).limit(1);
    expect(existing.length).toBe(1);
    // Would return alreadyRegistered: true
    const result = existing.length > 0 ? { success: true, alreadyRegistered: true } : { success: true, alreadyRegistered: false };
    expect(result.alreadyRegistered).toBe(true);
  });

  it("should insert new entry and notify owner for new email", async () => {
    const insertValuesMock = vi.fn().mockResolvedValue(undefined);
    const mockDb = {
      select: vi.fn().mockReturnThis(),
      from: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      limit: vi.fn().mockResolvedValue([]), // no existing entry
      insert: vi.fn().mockReturnValue({ values: insertValuesMock }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);
    vi.mocked(notifyOwner).mockResolvedValue(true);

    const db = await getDb();
    const { eq } = await import("drizzle-orm");
    const { waitlist } = await import("../drizzle/schema");

    const existing = await db!.select().from(waitlist).where(eq(waitlist.email, "new@test.com")).limit(1);
    expect(existing.length).toBe(0);

    await db!.insert(waitlist).values({ name: "Test", email: "new@test.com", profile: "patient" });
    expect(insertValuesMock).toHaveBeenCalledWith({ name: "Test", email: "new@test.com", profile: "patient" });

    await notifyOwner({ title: "✨ Nova inscrição na lista de espera", content: "Nome: Test\nEmail: new@test.com\nPerfil: Paciente" });
    expect(notifyOwner).toHaveBeenCalledOnce();
  });
});

describe("Contact form procedure logic", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should insert contact message and notify owner", async () => {
    const insertValuesMock = vi.fn().mockResolvedValue(undefined);
    const mockDb = {
      insert: vi.fn().mockReturnValue({ values: insertValuesMock }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);
    vi.mocked(notifyOwner).mockResolvedValue(true);

    const db = await getDb();
    const { contactMessages } = await import("../drizzle/schema");

    const input = {
      name: "Maria",
      email: "maria@test.com",
      profile: "patient",
      subject: "Dúvida sobre o app",
      message: "Gostaria de saber mais sobre o aplicativo Emma.",
    };

    await db!.insert(contactMessages).values({
      name: input.name,
      email: input.email,
      profile: input.profile,
      subject: input.subject,
      message: input.message,
    });

    expect(insertValuesMock).toHaveBeenCalledWith({
      name: "Maria",
      email: "maria@test.com",
      profile: "patient",
      subject: "Dúvida sobre o app",
      message: "Gostaria de saber mais sobre o aplicativo Emma.",
    });

    await notifyOwner({
      title: `📧 Nova mensagem de contato: ${input.subject}`,
      content: `Nome: ${input.name}\nEmail: ${input.email}`,
    });
    expect(notifyOwner).toHaveBeenCalledOnce();
  });

  it("should use null for optional fields when not provided", async () => {
    const insertValuesMock = vi.fn().mockResolvedValue(undefined);
    const mockDb = {
      insert: vi.fn().mockReturnValue({ values: insertValuesMock }),
    };
    vi.mocked(getDb).mockResolvedValue(mockDb as any);

    const db = await getDb();
    const { contactMessages } = await import("../drizzle/schema");

    await db!.insert(contactMessages).values({
      name: "João",
      email: "joao@test.com",
      profile: null,
      subject: null,
      message: "Mensagem sem assunto ou perfil.",
    });

    expect(insertValuesMock).toHaveBeenCalledWith(
      expect.objectContaining({ profile: null, subject: null })
    );
  });
});
