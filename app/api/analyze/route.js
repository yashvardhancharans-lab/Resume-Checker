import { NextResponse } from "next/server";
import { analyzeResume } from "@/lib/ai";

export async function POST(request) {
  try {
    const body = await request.json();
    const { resumeText, roles, companies } = body;

    if (!resumeText || resumeText.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Resume text is required" },
        { status: 400 }
      );
    }

    // Check for API key
    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured. Please add it to your .env.local file.",
        },
        { status: 500 }
      );
    }

    const result = await analyzeResume(
      resumeText,
      roles || [],
      companies || []
    );

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Analysis error:", error);

    // Handle specific Groq errors
    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { success: false, error: "Invalid API key. Please check your GROQ_API_KEY." },
        { status: 401 }
      );
    }

    if (error.message?.includes("rate limit")) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded. Please wait a moment and try again." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: error.message || "Analysis failed. Please try again." },
      { status: 500 }
    );
  }
}
