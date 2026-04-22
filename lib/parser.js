import mammoth from "mammoth";

export async function parsePDF(buffer) {
  try {
    // Next.js Turbopack robust CJS import for pdf-parse@2.4.5
    const pdfParseModule = require("pdf-parse");
    const PDFParse = pdfParseModule.PDFParse || pdfParseModule;
    
    if (typeof PDFParse === "function" && !PDFParse.prototype?.getText) {
       // fallback for 1.1.1
       const result = await PDFParse(buffer);
       return result.text || "";
    } else {
       const parser = new PDFParse({ data: buffer });
       const result = await parser.getText();
       await parser.destroy();
       return result.text || "";
    }
  } catch (err) {
    console.error("PDF parse error:", err);
    throw err;
  }
}

export async function parseDOCX(buffer) {
  try {
    const result = await mammoth.extractRawText({ buffer });
    return result.value || "";
  } catch (err) {
    console.error("DOCX parse error:", err);
    throw new Error("Failed to parse DOCX file");
  }
}

export async function parseFile(buffer, mimeType) {
  if (mimeType === "application/pdf") {
    return parsePDF(buffer);
  } else if (
    mimeType ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return parseDOCX(buffer);
  } else {
    throw new Error("Unsupported file type. Please upload a PDF or DOCX.");
  }
}
