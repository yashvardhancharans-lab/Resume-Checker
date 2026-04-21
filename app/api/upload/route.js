import { NextResponse } from "next/server";
import { parseFile } from "@/lib/parser";

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 }
      );
    }

    // Validate file type
    const validTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];

    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: "Unsupported file type. Please upload PDF or DOCX." },
        { status: 400 }
      );
    }

    // Validate file size (10MB)
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: "File too large. Maximum size is 10MB." },
        { status: 400 }
      );
    }

    // Convert to buffer and parse
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const text = await parseFile(buffer, file.type);

    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Could not extract text from the file. The file may be empty or image-based." },
        { status: 422 }
      );
    }

    return NextResponse.json({
      success: true,
      text: text.trim(),
      filename: file.name,
      size: file.size,
    });
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to process file" },
      { status: 500 }
    );
  }
}
