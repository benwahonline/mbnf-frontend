import "@testing-library/jest-dom";

// Polyfill for TextEncoder / TextDecoder (for Firebase / Jest compatibility)
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill for ReadableStream (needed by Firebase Auth / undici)
if (typeof global.ReadableStream === "undefined") {
  const { ReadableStream } = require("web-streams-polyfill");
  global.ReadableStream = ReadableStream;
}
