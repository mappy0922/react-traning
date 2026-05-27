import * as d3 from "d3";
import { iris_data } from "./iris_data";
import { useState } from "react";

const property = [
    "sepalLength",
    "sepalWidth",
    "petalLength",
    "petalWidth"
];

const dataColor = {
    "setosa": "lightgreen",
    "versicolor": "plum",
    "virginica": "lightsalmon",
};

const xline = {
    "sepalLength": [],
    "sepalWidth": [],
    "petalLength": [],
    "petalWidth": [],
}

const yline = {
    "sepalLength": [],
    "sepalWidth": [],
    "petalLength": [],
    "petalWidth": [],
}

export default function App() {
    const width = 500;
    const height = 500;
    const padding = 70;

    let size = 0;

    const [selected_X, setselected_X] = useState(property[0]);
    const [selected_Y, setselected_Y] = useState(property[1]);
    const [Active, SetActive] = useState({
        setosa: false,
        versicolor: false,
        virginica: false,
    });

    /*----------------散布図調整----------------*/
    const x = d3.scaleLinear()
    .domain(d3.extent(iris_data, (d) => d[selected_X]))
    .nice()
    .range([padding-20, width - padding])

    const y = d3.scaleLinear()
    .domain(d3.extent(iris_data, (d) => d[selected_Y]))
    .nice()
    .range([height - padding, padding]);

    /*--------------X軸目盛り線調整---------------*/
    const [xmin,xmax] = x.domain();
    const xstep = (selected_X==="sepalLength" || selected_X==="petalLength") ? 0.5 : 0.2;

    for (let i=xmin; Number(i.toFixed(1))<=xmax; i+=xstep) {
        xline[selected_X][size++] = Number(i.toFixed(1));
    }
    /*----------------------------------------*/


    /*------------Y軸目盛り線調整---------------*/
    size = 0;

    const [ymin,ymax] = y.domain();
    const ystep = (selected_Y==="sepalLength" || selected_Y==="petalLength") ? 0.5 : 0.2;

    for (let i=ymin; Number(i.toFixed(1))<=ymax; i+=ystep) {
        yline[selected_Y][size++] = Number(i.toFixed(1));
    }
    /*---------------------------------------*/


    const label=Array.from(new Set(iris_data.map(({species})=>species)))

    return (
        <div className = "top">
            <h1 className="title">scatter plot of iris data</h1>
            <div className="controls">
                <div className="item">

                    <label>x property</label>
                    <select
                        className = "Select"
                        value={selected_X}
                        onChange={(e) =>
                            setselected_X(e.target.value)
                        }
                    >
                        {property.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="item">

                    <label>y property</label>
                    <select
                        className="Select"
                        value={selected_Y}
                        onChange={(e) =>
                            setselected_Y(e.target.value)
                        }
                    >
                        {property.map((p) => (
                            <option key={p} value={p}>
                                {p}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            <div className="chart">
                <svg width = { width } height = { height }>
    
                    <g>

                        {iris_data.map((item) => (
                            <circle 
                            className="point"
                            cx={x(item[selected_X])} 
                            cy={y(item[selected_Y])} 
                            r="5" 
                            fill={dataColor[item.species]}
                            opacity={Active[item.species] ? 0 : 1}
                            />
                        ))}

                        <line //X軸
                        x1={padding-20}
                        y1={height - padding}
                        x2={width - padding}
                        y2={height - padding}
                        stroke="gray"
                        />

                        <line //Y軸
                        x1={padding-20}
                        y1={height-padding}
                        x2={padding-20}
                        y2={padding}
                        stroke="gray"
                        />

                        {xline[selected_X].map((v) => (
                            <> 
                            <line //X軸目盛り線位置
                            x1={x(v)}
                            y1={height - padding}
                            x2={x(v)}
                            y2={height - padding + 10}
                            stroke="gray"
                            />

                            <text //X軸目盛り線の値位置
                            className = "text"
                            x={x(v)}
                            y={height - padding + 25}
                            textAnchor="middle"
                            >
                                {v.toString()}
                            </text>
                            </>
                        ))}

                        {yline[selected_Y].map((v) => (
                            <> 
                            <line //Y軸目盛り線位置
                            x1={padding-30}
                            y1={y(v)}
                            x2={padding-20}
                            y2={y(v)}
                            stroke="gray"
                            />

                            <text //Y軸目盛り線の値位置
                            className = "text"
                            x={padding-35}
                            y={y(v)}
                            textAnchor="end"
                            dominantBaseline="central"
                            >
                                {v.toString()}
                            </text>
                            </>
                        ))} 
                    </g>
                </svg>
                
                <svg width={ 150 } height={ 150 }>
                    {label.map((name, i) => (
                        <g 
                        transform={`translate(0, ${35*i+30})`}
                        className={Active[name] ? "fade" : ""}
                        onClick={() => SetActive({
                            ...Active,//スプレッド構文(上書き処理に利用できる)
                            [name]: !Active[name]
                        })}
                        >
                            <rect
                            width="15"
                            height="15"
                            fill={dataColor[name]}
                            />
                            <text 
                            className = "legend"
                            x="25"
                            y="13">
                                {name}
                            </text>
                        </g>
                    ))}
                </svg>
            </div>
        </div>
    )
}

/*
{iris_data.map((item) => (
    <circle 
    cx={item[selected_X]*80} 
    cy={height - item[selected_Y]*80} 
    r="5" 
    fill={dataColor[item.species]}
    opacity={Active[item.species] ? 0 : 1}
    />
))}

これで散布図調整できなかった
*/