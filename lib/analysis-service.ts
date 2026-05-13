import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY! });

export interface PlayerPosition {
  x: number;
  y: number;
  team: 'A' | 'B';
  id: string;
}

export interface PlayerStat {
  num: string;
  name: string;
  role: string;
  rating: string;
  passes: string;
  int: string;
  speed: string;
  efficiency: number;
}

export interface TacticalStats {
  raciocinio_visual: string;
  matchType: 'PROFESSIONAL' | 'AMATEUR' | 'PRACTICE';
  possession: string;
  xg: string;
  pressingIntensity: string;
  matchMomentum: number[];
  playerPositions: PlayerPosition[];
  playerStats: PlayerStat[];
  summary: string;
  title: string;
  date: string;
}

export async function analyzeVideoFootage(file: File): Promise<TacticalStats> {
  const base64Data = await new Promise<string>((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      const base64 = (reader.result as string).split(',')[1];
      resolve(base64);
    };
    reader.readAsDataURL(file);
  });

  const schema = {
    type: Type.OBJECT,
    properties: {
      raciocinio_visual: {
        type: Type.STRING,
        description: "Detailed visual chain-of-thought observing positions, actions, and pitch characteristics.",
      },
      matchType: {
        type: Type.STRING,
        enum: ["PROFESSIONAL", "AMATEUR", "PRACTICE"],
      },
      possession: { type: Type.STRING, description: "Percentage, e.g. 55%" },
      xg: { type: Type.STRING, description: "Expected goals value, e.g. 1.24" },
      pressingIntensity: { 
        type: Type.STRING, 
        description: "Scale 1-10. 10 = defending in final third < 2m from ball carrier." 
      },
      matchMomentum: {
        type: Type.ARRAY,
        items: { type: Type.NUMBER },
        description: "Array of 40 values representing dominant flow over the clip.",
      },
      playerPositions: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            x: { type: Type.NUMBER },
            y: { type: Type.NUMBER },
            team: { type: Type.STRING, enum: ["A", "B"] },
            id: { type: Type.STRING },
          },
          required: ["x", "y", "team", "id"],
        },
      },
      playerStats: {
        type: Type.ARRAY,
        items: {
          type: Type.OBJECT,
          properties: {
            num: { type: Type.STRING },
            name: { type: Type.STRING },
            role: { type: Type.STRING },
            rating: { type: Type.STRING },
            passes: { type: Type.STRING },
            int: { type: Type.STRING },
            speed: { type: Type.STRING },
            efficiency: { type: Type.NUMBER },
          },
          required: ["num", "name", "role", "rating", "passes", "int", "speed", "efficiency"],
        },
      },
      summary: { type: Type.STRING },
      title: { type: Type.STRING },
      date: { type: Type.STRING },
    },
    required: [
      "raciocinio_visual", "matchType", "possession", "xg", "pressingIntensity", 
      "matchMomentum", "playerPositions", "playerStats", "summary", "title", "date"
    ],
  };

  const prompt = `Analyze this football (soccer) match footage.
    
    1. START WITH VISUAL REASONING: In the 'raciocinio_visual' field, describe exactly what you see: players detected, kit colors, pitch markings, and tactical block types (high/low).
    
    2. MATCH CATEGORY:
    - PROFESSIONAL: Broadcast quality, stadium, branded kits.
    - AMATEUR: Local field, simple uniforms, static camera.
    - PRACTICE: Training session, bibs.

    3. METRICS SCALES:
    - PRESSING INTENSITY: Use a scale of 1 to 10. 10 means the defending team is consistently within 2 meters of the ball carrier in the opponent's final third.
    - PLAYER SPEED: Categorize movement as Walk (0-7 km/h), Jog (8-15 km/h), or Sprint (16+ km/h) based on visual biomechanics.
    
    4. EXTRACTION:
    - Map every visible player to X, Y coordinates on a 0-100 grid (0,0 is top-left, 100,100 is bottom-right).
    - Group players by kit colors into Team A and Team B.
    - Generate a descriptive 'title' (e.g., TEAM A vs TEAM B) and the current match 'date' if visible, otherwise 'Current Analysis'.

    CRITICAL: Report only what is visible. If data is unavailable, use default values (0 or "N/A") but always adhere to the JSON schema.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-pro-preview",
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
      responseSchema: schema,
    }
  });

  const text = response.text;
  if (!text) throw new Error("Empty response from AI");
  return JSON.parse(text) as TacticalStats;
}

