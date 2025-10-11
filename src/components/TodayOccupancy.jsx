import React from "react";

const TodayOccupancy = ({ 
  percentage,
  strokeWidth = 10, 
  color = "#ef4444", 
  backgroundColor = "#fecaca",
  showText = true,
  textColor = "#ef4444",
  animated = true 
}) => {
  // We’ll calculate size dynamically from container
  const size = 150; 
  const radius = (size - strokeWidth) / 2;
  const circumference = Math.PI * radius; // Half circle
  const strokeDasharray = circumference;
const strokeDashoffset = circumference * (1 - percentage / 100);

  return (
    <div className="relative inline-flex items-center justify-center w-32 sm:w-40 md:w-48 lg:w-56">
      <svg
        className="w-full h-auto overflow-visible"
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth / 2 + 15}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* Background Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          stroke={backgroundColor}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
        />
        
        {/* Progress Arc */}
        <path
          d={`M ${strokeWidth / 2} ${size / 2} A ${radius} ${radius} 0 0 1 ${size - strokeWidth / 2} ${size / 2}`}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="transparent"
          strokeLinecap="round"
          strokeDasharray={strokeDasharray}
          strokeDashoffset={strokeDashoffset}
          className={animated ? "transition-all duration-1000 ease-out" : ""}
        />
      </svg>
      
      {/* Center Text */}
      {showText && (
        <div 
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-center font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl"
          style={{ color: textColor }}
        >
  {Math.round(percentage)}%
        </div>
      )}
    </div>
  );
};

export default TodayOccupancy;
