export function AmslerGrid() {
  const gridSize = 400;
  const numLines = 20;
  const spacing = gridSize / numLines;
  const dotRadius = 5;

  return (
    <div className="bg-white p-4 rounded-md shadow-inner">
      <svg
        width="100%"
        height="100%"
        viewBox={`0 0 ${gridSize} ${gridSize}`}
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width={gridSize} height={gridSize} fill="white" />
        {/* Vertical Lines */}
        {Array.from({ length: numLines + 1 }).map((_, i) => (
          <line
            key={`v-${i}`}
            x1={i * spacing}
            y1="0"
            x2={i * spacing}
            y2={gridSize}
            stroke="black"
            strokeWidth="1"
          />
        ))}
        {/* Horizontal Lines */}
        {Array.from({ length: numLines + 1 }).map((_, i) => (
          <line
            key={`h-${i}`}
            x1="0"
            y1={i * spacing}
            x2={gridSize}
            y2={i * spacing}
            stroke="black"
            strokeWidth="1"
          />
        ))}
        {/* Central Dot */}
        <circle
          cx={gridSize / 2}
          cy={gridSize / 2}
          r={dotRadius}
          fill="black"
        />
      </svg>
    </div>
  );
}
