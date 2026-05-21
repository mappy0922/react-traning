export default function App(){
  const width = 450;
  const height = 450;
  const rect = [
    { x: 100, y: 85, w: 250, h: 30, color: "orange" },
    { x: 100, y: 185, w: 200, h: 30, color: "purple" },
    { x: 100, y: 285, w: 100, h: 30, color: "pink" },
    { x: 100, y: 385, w: 50, h: 30, color: "lightblue" }
  ];
  const labelline = [
    {x1: 90, y1: 100, x2: 100, y2: 100},
    {x1: 90, y1: 200, x2: 100, y2: 200},
    {x1: 90, y1: 300, x2: 100, y2: 300},
    {x1: 90, y1: 400, x2: 100, y2: 400},
  ];
  const labels = [
    {x: 85, y: 97.5, label: "A"},
    {x: 85, y: 197.5, label: "B"},
    {x: 85, y: 297.5, label: "C"},
    {x: 85, y: 397.5, label: "D"},
  ];
  return (
    <svg width={width} height={height}>
      <g>  
        <line x1="100" y1="0" x2="100" y2="450" stroke="black"/>
        {labelline.map(({ x1, y1, x2, y2 }, i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
        ))}

        {rect.map(({ x, y, w, h, color }, i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={color} ></rect>
        ))}

        {labels.map(({ x, y, label }, i) => (
          <text key={i} x={x} y={y} fill="black" textAnchor="end" dominantBaseline="central">{label}</text>
        ))}
      </g>
    </svg>
  );
};