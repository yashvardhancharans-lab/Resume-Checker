import "./globals.css";

export const metadata = {
  title: "ResumeArchitect — AI Resume Analyzer",
  description:
    "Upload your resume and define your target. Our AI architect will align your professional story with market-leading standards.",
  keywords: ["resume", "AI", "analyzer", "career", "job", "optimization"],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,700;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
