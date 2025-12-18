import { describe, it, expect, beforeEach } from "vitest";
import { normalizeSrc, setBaseUrl } from "../BoxDecoration";

describe("normalizeSrc", () => {
  beforeEach(() => {
    setBaseUrl("");
  });

  it("should return empty string for null/undefined/empty input", () => {
    // @ts-ignore
    expect(normalizeSrc(null)).toBe("");
    // @ts-ignore
    expect(normalizeSrc(undefined)).toBe("");
    expect(normalizeSrc("")).toBe("");
  });

  it("should keep absolute URLs unchanged", () => {
    expect(normalizeSrc("http://example.com/img.png")).toBe("http://example.com/img.png");
    expect(normalizeSrc("https://example.com/img.png")).toBe("https://example.com/img.png");
    expect(normalizeSrc("//example.com/img.png")).toBe("//example.com/img.png");
    expect(normalizeSrc("file:///User/img.png")).toBe("file:///User/img.png");
  });

  it("should keep data and blob URIs unchanged", () => {
    expect(normalizeSrc("data:image/png;base64,xxxx")).toBe("data:image/png;base64,xxxx");
    expect(normalizeSrc("blob:http://example.com/xxxx")).toBe("blob:http://example.com/xxxx");
  });

  it("should not prepend baseUrl if not set", () => {
    expect(normalizeSrc("assets/img.png")).toBe("assets/img.png");
    expect(normalizeSrc("/assets/img.png")).toBe("/assets/img.png");
  });

  it("should prepend baseUrl correctly", () => {
    setBaseUrl("/app");
    expect(normalizeSrc("assets/img.png")).toBe("/app/assets/img.png");
    expect(normalizeSrc("/assets/img.png")).toBe("/app/assets/img.png");

    setBaseUrl("/app/");
    expect(normalizeSrc("assets/img.png")).toBe("/app/assets/img.png");
    expect(normalizeSrc("/assets/img.png")).toBe("/app/assets/img.png");
  });

  it("should avoid double prepending baseUrl", () => {
    setBaseUrl("/app");
    expect(normalizeSrc("/app/assets/img.png")).toBe("/app/assets/img.png");
  });
});
