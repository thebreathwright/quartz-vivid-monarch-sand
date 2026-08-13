function toHex(bytes: ArrayBuffer | Uint8Array): string {
  const view = bytes instanceof Uint8Array ? bytes : new Uint8Array(bytes);
  return [...view].map((b) => b.toString(16).padStart(2, "0")).join("");
}

export async function sha256Hex(input: string): Promise<string> {
  const data = new TextEncoder().encode(input);
  if (globalThis.crypto?.subtle) {
    const buf = await globalThis.crypto.subtle.digest("SHA-256", data);
    return toHex(buf);
  }
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(input).digest("hex");
}

export async function sha256Json(value: unknown): Promise<string> {
  return sha256Hex(JSON.stringify(value));
}
