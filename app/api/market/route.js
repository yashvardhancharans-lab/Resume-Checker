import { NextResponse } from "next/server";
import { getMarketInsights } from "@/lib/ai";

export async function POST(request) {
  try {
    const body = await request.json();
    const { role } = body;

    if (!role || role.trim().length === 0) {
      return NextResponse.json(
        { success: false, error: "Role is required" },
        { status: 400 }
      );
    }

    if (!process.env.GROQ_API_KEY) {
      return NextResponse.json(
        {
          success: false,
          error: "GROQ_API_KEY is not configured.",
        },
        { status: 500 }
      );
    }

    const result = await getMarketInsights(role.trim());

    return NextResponse.json({
      success: true,
      result,
    });
  } catch (error) {
    console.error("Market Insights error:", error);

    if (error.message?.includes("API key")) {
      return NextResponse.json(
        { success: false, error: "Invalid API key." },
        { status: 401 }
      );
    }

    if (error.message?.includes("rate limit")) {
      return NextResponse.json(
        { success: false, error: "Rate limit exceeded." },
        { status: 429 }
      );
    }

    return NextResponse.json(
      { success: false, error: "Failed to fetch market insights." },
      { status: 500 }
    );
  }
}
