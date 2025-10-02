"use client";
import { useEffect, useState } from "react";

function getHandAngles(date: Date) {
  const sec = date.getSeconds();
  const min = date.getMinutes();
  const hr = date.getHours() % 12 + min / 60;
  return {
    second: sec * 6,              // 360/60
    minute: min * 6 + sec * 0.1,  // 360/60 + smooth progress
    hour: hr * 30                  // 360/12
  };
}

export default function DateTimeWidget() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const tick = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(tick);
  }, []);

  const angles = getHandAngles(now);
  const dateStr = now.toLocaleDateString(undefined, {
    weekday: "long", month: "long", day: "numeric", year: "numeric"
  });

  return (
    <div className="bg-white/90 rounded-lg shadow p-6 flex flex-col items-center min-w-[220px]">
      {/* Analog Clock */}
      <div className="relative w-28 h-28 mb-3">
        <svg width={112} height={112} viewBox="0 0 112 112">
          <circle cx="56" cy="56" r="54" fill="#fafafa" stroke="#d3d3d3" strokeWidth="2"/>
          {/* hour marks */}
          {[...Array(12)].map((_, i) => {
            const a = (i * 30 - 90) * (Math.PI / 180);
            const x1 = 56 + Math.cos(a) * 44;
            const y1 = 56 + Math.sin(a) * 44;
            const x2 = 56 + Math.cos(a) * 50;
            const y2 = 56 + Math.sin(a) * 50;
            return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2}
              stroke="#888" strokeWidth={i % 3 === 0 ? 4 : 2}/>;
          })}
          {/* hour hand */}
          <line x1="56" y1="56"
            x2={56 + 28 * Math.cos((angles.hour - 90) * Math.PI / 180)}
            y2={56 + 28 * Math.sin((angles.hour - 90) * Math.PI / 180)}
            stroke="#333" strokeWidth="6" strokeLinecap="round"/>
          {/* minute hand */}
          <line x1="56" y1="56"
            x2={56 + 40 * Math.cos((angles.minute - 90) * Math.PI / 180)}
            y2={56 + 40 * Math.sin((angles.minute - 90) * Math.PI / 180)}
            stroke="#333" strokeWidth="4" strokeLinecap="round"/>
          {/* second hand */}
          <line x1="56" y1="56"
            x2={56 + 46 * Math.cos((angles.second - 90) * Math.PI / 180)}
            y2={56 + 46 * Math.sin((angles.second - 90) * Math.PI / 180)}
            stroke="#e53e3e" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="56" cy="56" r="4" fill="#222"/>
        </svg>
      </div>
      {/* Date only */}
      <div className="text-lg text-gray-700">{dateStr}</div>
      <div className="text-xs text-gray-400 mt-1">Local Time</div>
    </div>
  );
}
