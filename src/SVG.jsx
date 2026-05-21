export default function App(){
  const width = 400;
  const height = 400;
  const rect = [
    { x: 100, y: 85, w: 250, h: 30, color: "orange", value: 250 },
    { x: 100, y: 185, w: 200, h: 30, color: "purple", value: 200 },
    { x: 100, y: 285, w: 100, h: 30, color: "pink", value: 100 },
  ];
  const labelline = [
    {x1: 90, y1: 100, x2: 100, y2: 100},
    {x1: 90, y1: 200, x2: 100, y2: 200},
    {x1: 90, y1: 300, x2: 100, y2: 300},
  ];
  const labels = [
    {x: 85, y: 97.5, label: "A"},
    {x: 85, y: 197.5, label: "B"},
    {x: 85, y: 297.5, label: "C"},
  ];
  return (
    <svg width={width} height={height}>
      <g>  
        <line x1="100" y1="0" x2="100" y2="400" stroke="black"/>
        {labelline.map(({ x1, y1, x2, y2 }, i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="black" />
        ))}

        {rect.map(({ x, y, w, h, color, value }, i) => (
          <rect key={i} x={x} y={y} width={w} height={h} fill={color} >
            <title>{value}</title>
          </rect>
        ))}

        {labels.map(({ x, y, label }, i) => (
          <text key={i} x={x} y={y} fill="black" textAnchor="end" dominantBaseline="central">{label}</text>
        ))}
      </g>
    </svg>
  );
};