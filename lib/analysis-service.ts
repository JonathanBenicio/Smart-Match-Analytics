import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.NEXT_PUBLIC_GEMINI_API_KEY! });

export interface TacticalStats {
  possession: string;
  xg: string;
  pressingIntensity: string;
  matchMomentum: number[];
  matchType: 'PROFESSIONAL' | 'AMATEUR' | 'PRACTICE';
  playerPositions: Array<{ x: number, y: number, team: 'A' | 'B', id: string }>;
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

  const prompt = `Analyze this football (soccer) match footage. Extract tactical statistics and player performance data strictly based on visual evidence.
    
    MATCH CATEGORY DETERMINATION:
    - PROFESSIONAL: Broadcast quality, branded kits, professional stadium.
    - AMATEUR: Local field, simple kits, static/handheld camera.
    - PRACTICE: Training session, bibs, no formal match structure.

    CORE EXTRACTION TASK:
    1. PLAYER POSITIONS: Locate every visible player. Return their (x, y) coordinates on a 0-100 pitch grid (0,0 = top-left).
    2. TEAM IDENTIFICATION: Group players into Team A and Team B based on jersey colors.
    3. TACTICAL METRICS: Estimate Possession, xG, and Pressing Intensity based ONLY on the current field tilt and positioning in the clip. 
    4. PLAYER PERFORMANCE: Identify prominent players and estimate their metrics based on visible speed and accuracy.

    CRITICAL: DO NOT INVENT DATA. If a metric cannot be determined from the footage, use "N/A" or 0. Report only what is visible.

    Return JSON schema:
    {
      "matchType": "PROFESSIONAL | AMATEUR | PRACTICE",
      "possession": "string",
      "xg": "string",
      "pressingIntensity": "string",
      "matchMomentum": [40 values],
      "playerPositions": [{"x": number, "y": number, "team": "A" | "B", "id": "string"}],
      "playerStats": [
        {
          "name": "string (or 'Player X')",
          "passes": "string",
          "int": "string",
          "speed": "string",
          "efficiency": number,
          "rating": "string",
          "num": "string (seen on jersey)",
          "role": "string"
        }
      ],
      "summary": "Tactical summary based on visual analysis"
    }`;

  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: [
      {
        parts: [
          { text: prompt },
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

  const text = response.text;
  if (!text) {
    throw new Error("Empty response from AI");
  }

  try {
    return JSON.parse(text) as TacticalStats;
  } catch (e) {
    console.error("Failed to parse Gemini response", text, e);
    throw new Error("Failed to extract statistics from video.");
  }
}
