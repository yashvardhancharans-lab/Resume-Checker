import fs from "fs";
import { parsePDF } from "./lib/parser.js";

async function test() {
  try {
    const buffer = fs.readFileSync("dummy.pdf");
    const text = await parsePDF(buffer);
    console.log("Success! Text:", text);
  } catch (err) {
    console.error("Caught error:", err);
  }
}

test();
