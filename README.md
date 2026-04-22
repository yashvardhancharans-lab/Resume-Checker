# 🚀 AI Resume Analyzer (ResumeArchitect)

An intelligent, full-stack career tool that leverages AI to analyze resumes against specific job descriptions. It provides actionable feedback, formatting recommendations, and a gap analysis to help candidates land their dream roles.

## ✨ Features

- **Automated Resume Parsing:** Extracts text from both PDF and DOCX files securely.
- **AI-Powered Analysis:** Uses the GROQ API to perform deep evaluations of resumes against target job descriptions.
- **Actionable Insights:** Provides a clear "Appropriate/Not Appropriate" verdict, candidate summary, and specific improvement steps.
- **Market Insights:** Real-time dashboard showing industry trends for various professional roles.
- **History Tracking:** Persistent local history feature for past resume analyses.
- **Modern UI:** Built with Tailwind CSS, featuring a clean, responsive, and professional design.

## 🛠️ Tech Stack

- **Frontend & Backend:** [Next.js](https://nextjs.org/) (React Framework)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **AI Integration:** [GROQ SDK](https://groq.com/)
- **Document Processing:** 
  - `pdf-parse` for PDF extraction
  - `mammoth` for DOCX extraction

## 🚀 Getting Started

### Prerequisites

You will need a GROQ API Key to run the AI analysis.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yashvardhancharans-lab/Resume-Checker.git
   cd Resume-Checker
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Environment Variables**
   Create a `.env.local` file in the root directory and add your GROQ API key:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   ```

4. **Run the Development Server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🚀 Deployment

The easiest way to deploy this application is using the [Vercel Platform](https://vercel.com/new). 
When deploying, make sure to add your `GROQ_API_KEY` to the Environment Variables in your project settings.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the issues page.

