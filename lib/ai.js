import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export async function analyzeResume(resumeText, roles, companies) {
  const systemPrompt = `You are ResumeArchitect, an elite AI career strategist and resume analyst. You provide brutally honest, actionable resume analysis.

Your analysis must be structured and data-driven. You evaluate resumes against target roles and companies, providing specific, quantified feedback.

IMPORTANT: You must respond ONLY with valid JSON matching the exact schema below. No markdown, no explanations outside the JSON.`;

  const userPrompt = `Analyze this resume for the following targets:

TARGET ROLES: ${roles.length > 0 ? roles.join(", ") : "General"}
TARGET COMPANIES: ${companies.length > 0 ? companies.join(", ") : "General"}

RESUME TEXT:
${resumeText}

Respond with this exact JSON structure:
{
  "score": <number 0-100>,
  "verdict": "<'Appropriate' or 'Not Appropriate'>",
  "summary": "<2-3 sentence candidate summary>",
  "strengths": ["<strength 1>", "<strength 2>", "<strength 3>", "<strength 4>"],
  "weaknesses": ["<weakness 1>", "<weakness 2>", "<weakness 3>", "<weakness 4>"],
  "improvements": ["<detailed step 1>", "<detailed step 2>", "<detailed step 3>", "<detailed step 4>", "<detailed step 5>", "<detailed step 6>"],
  "companyTips": ["<company-specific tip 1>", "<company-specific tip 2>", "<company-specific tip 3>", "<company-specific tip 4>"]
}

Be specific. Reference actual content from the resume. Each improvement should be an actionable step the candidate can take immediately.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.3,
    max_tokens: 2000,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  return JSON.parse(content);
}

export async function getMarketInsights(role) {
  const systemPrompt = `You are a real-time Tech Market Analyst AI. You provide data-driven, accurate, and current market trends for career roles.
IMPORTANT: You must respond ONLY with valid JSON matching the exact schema below. No markdown, no explanations outside the JSON.`;

  const userPrompt = `Provide current market insights for the role: "${role}"

Respond with this exact JSON structure:
{
  "role": "${role}",
  "summary": "<2-sentence comprehensive market overview focusing on demand and future outlook>",
  "hiringVelocity": "<A short string like 'High Demand', 'Cooling', or '+15% YoY Growth'>",
  "salaryRange": "<A string representing a realistic standard market salary range, e.g. '$130k - $180k'>",
  "trendingSkills": ["<skill 1>", "<skill 2>", "<skill 3>", "<skill 4>", "<skill 5>"]
}

Base this on the current highly accurate tech industry landscape.`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [
      { role: "system", content: systemPrompt },
      { role: "user", content: userPrompt },
    ],
    temperature: 0.4,
    max_tokens: 800,
    response_format: { type: "json_object" },
  });

  const content = completion.choices[0]?.message?.content;
  if (!content) {
    throw new Error("No response from AI");
  }

  return JSON.parse(content);
}
