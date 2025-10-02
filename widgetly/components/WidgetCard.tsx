// src/components/WidgetCard.tsx
import React, { ReactNode } from "react";

type Props = {
  title?: string;
  subtitle?: string;
  children?: ReactNode;
  className?: string;
};

export default function WidgetCard({ title, subtitle, children, className = "" }: Props) {
  return (
    <div className={`glass rounded-2xl p-5 ${className} card-hover`}>
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="text-sm text-pink-200 font-semibold">{title}</div>
          {subtitle && <div className="text-xs text-white/60">{subtitle}</div>}
        </div>
        <div className="text-xs text-white/50">●</div>
      </div>

      <div className="text-white/90">
        {children}
      </div>
    </div>
  );
}
