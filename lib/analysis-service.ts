import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY });

export interface TacticalStats {
  possession: string;
  xg: string;
  pressingIntensity: string;
  matchMomentum: number[];
  matchType: 'PROFESSIONAL' | 'AMATEUR' | 'PRACTICE';
  playerStats: Array<{
    name: string;
    passes: string;
    int: string;
    speed: string;
    efficiency: number;
    rating: string;
    num: string;
    role: string;
  }>;
  summary: string;
}

export async function analyzeVideoFootage(file: File): Promise<TacticalStats> {
  // Convert file to base64
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64 = reader.result as string;
      resolve(base64.split(',')[1]);
    };
    reader.readAsDataURL(file);
  });

  const response = await ai.models.generateContent({
    model: "gemini-1.5-pro",
    contents: [
      {
        parts: [
          {
            text: `Analyze this football (soccer) match footage. Extract tactical statistics and player performance data.
            CRITICAL: Determine the match category:
            - PROFESSIONAL: High-quality broadcast, professional stadium, kits, and multi-cam.
            - AMATEUR: Local pitch, non-pro kits, single static camera or handheld.
            - PRACTICE: Training session, bibs, no match structure.

            Return the data in JSON format following this schema:
            {
              "matchType": "PROFESSIONAL | AMATEUR | PRACTICE",
              "possession": "string (e.g., 55%)",
              "xg": "string (e.g., 1.25)",
              "pressingIntensity": "string (e.g., 85.2)",
              "matchMomentum": "number array (40 values between 0-100 representing momentum over time)",
              "playerStats": [
                {
                  "name": "string",
                  "passes": "string (e.g., 45/50)",
                  "int": "string (e.g., 5)",
                  "speed": "string (e.g., 31.2)",
                  "efficiency": "number (0-100)",
                  "rating": "string (e.g., 8.5)",
                  "num": "string (jersey number)",
                  "role": "string (position)"
                }
              ],
              "summary": "string (A narrative summary of tactical insights)"
            }`
          },
          {
            inlineData: {
              data: base64Data,
              mimeType: file.type
            }
          }
        ]
      }
    ],
    config: {
      responseMimeType: "application/json",
    }
  });

  try {
    const text = response.text || "{}";
    return JSON.parse(text) as TacticalStats;
  } catch (e) {
    console.error("Failed to parse Gemini response", e);
    throw new Error("Failed to extract statistics from video.");
  }
}
