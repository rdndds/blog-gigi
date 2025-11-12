import React from "react";
import { Info, AlertTriangle, CheckCircle, XCircle } from "lucide-react";

interface InfoBoxProps {
  type: "info" | "warning" | "success" | "error";
  title?: string;
  children: React.ReactNode;
}

export default function InfoBox({ type, title, children }: InfoBoxProps) {
  const styles = {
    info: {
      container: "bg-blue-50 border-blue-500 text-blue-900",
      icon: "text-blue-600",
      Icon: Info,
    },
    warning: {
      container: "bg-orange-50 border-orange-500 text-orange-900",
      icon: "text-orange-600",
      Icon: AlertTriangle,
    },
    success: {
      container: "bg-green-50 border-green-500 text-green-900",
      icon: "text-green-600",
      Icon: CheckCircle,
    },
    error: {
      container: "bg-red-50 border-red-500 text-red-900",
      icon: "text-red-600",
      Icon: XCircle,
    },
  };

  const style = styles[type] || styles.info;
  const IconComponent = style.Icon;

  return (
    <div className={`my-6 border-l-4 rounded-r-lg p-4 ${style.container}`}>
      <div className="flex gap-3">
        <IconComponent
          className={`w-5 h-5 flex-shrink-0 mt-0.5 ${style.icon}`}
        />
        <div className="flex-1">
          {title && <h4 className="font-semibold mb-2">{title}</h4>}
          <div className="text-sm leading-relaxed">{children}</div>
        </div>
      </div>
    </div>
  );
}
