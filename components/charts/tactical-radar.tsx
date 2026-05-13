'use client';

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

const defaultData = [
  { subject: 'Aggression', A: 120, fullMark: 150 },
  { subject: 'Symmetry', A: 98, fullMark: 150 },
  { subject: 'Width', A: 86, fullMark: 150 },
  { subject: 'Depth', A: 99, fullMark: 150 },
  { subject: 'Speed', A: 85, fullMark: 150 },
  { subject: 'Press', A: 110, fullMark: 150 },
];

export function TacticalRadar() {
  return (
    <div className="w-full h-full min-h-[200px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={defaultData}>
          <PolarGrid stroke="#333" />
          <PolarAngleAxis dataKey="subject" tick={{ fill: '#A0A0A0', fontSize: 10, fontWeight: 700 }} />
          <Radar
            name="Tactics"
            dataKey="A"
            stroke="#1ED760"
            fill="#1ED760"
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
