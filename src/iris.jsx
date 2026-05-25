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

export default function App() {
    const width = 500;
    const height = 500;
    const padding = 70;

    const [selected_X, setselected_X] = useState(property[0]);
    const [selected_Y, setselected_Y] = useState(property[1]);
    const [Active, SetActive] = useState({
        setosa: false,
        versicolor: false,
        virginica: false,
    });

    const x = d3.scaleLinear()
    .nice()
    .domain(d3.extent(iris_data, (d) => d[selected_X]))
    .range([padding, width - padding]);

    const y = d3.scaleLinear()
    .nice()
    .domain(d3.extent(iris_data, (d) => d[selected_Y]))
    .range([height - padding, padding]);

    const xline = d3.extent(iris_data, (d) => d[selected_X]);
    const yline = d3.extent(iris_data, (d) => d[selected_Y]);

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
                            <>
                            <circle 
                            className="point"
                            cx={x(item[selected_X])} 
                            cy={y(item[selected_Y])} 
                            r="5" 
                            fill={dataColor[item.species]}
                            opacity={Active[item.species] ? 0 : 1}
                            />
                            <line
                            x1={padding}
                            y1={height - padding}
                            x2={width - padding}
                            y2={height - padding}
                            stroke="gray"
    
                            />
                            <line
                            x1={padding}
                            y1={height-padding}
                            x2={padding}
                            y2={padding}
                            stroke="gray"
                            />
                            </>
                        ))} 
                    </g>
                </svg>
                
                <svg width={ 150 } height={ 150 }>
                    {label.map((name, i) => (
                        <g 
                        transform={`translate(0, ${50*i+30})`}
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