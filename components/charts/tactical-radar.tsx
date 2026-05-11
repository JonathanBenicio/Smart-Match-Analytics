"use client";

import { PolarAngleAxis, PolarGrid, Radar, RadarChart, ResponsiveContainer } from "recharts";

const data = [
  { subject: 'ATTACKING', A: 120, B: 80, fullMark: 150 },
  { subject: 'DEFENDING', A: 98, B: 130, fullMark: 150 },
  { subject: 'SPEED', A: 86, B: 70, fullMark: 150 },
  { subject: 'PHYSICAL', A: 99, B: 100, fullMark: 150 },
  { subject: 'TACTICAL', A: 85, B: 90, fullMark: 150 },
];

export function TacticalRadar() {
  return (
    <div className="w-full h-full min-h-[300px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="rgba(255,255,255,0.1)" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: 'rgba(188, 203, 185, 0.6)', fontSize: 10, fontWeight: 700 }}
          />
          <Radar
            name="London Titans"
            dataKey="A"
            stroke="#4be277"
            strokeWidth={2}
            fill="#4be277"
            fillOpacity={0.15}
          />
          <Radar
            name="Madrid Eagles"
            dataKey="B"
            stroke="#adc6ff"
            strokeWidth={2}
            fill="#adc6ff"
            fillOpacity={0.15}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
