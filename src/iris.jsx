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
    .domain(d3.extent(iris_data, d => d[selected_Y]))
    .range([height - padding, padding]);

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
                            cx={x(item[selected_X])} 
                            cy={y(item[selected_Y])} 
                            r="5" 
                            fill={dataColor[item.species]}
                            opacity={Active[item.species] ? 0 : 1}
                            />
                        ))} 
                    </g>
                </svg>
                
                <label className="legend">
                    {label.map((name) => (
                        <div
                        className={Active[name] ? "fade" : ""}
                        onClick={() => SetActive({
                            ...Active,
                            [name]: !Active[name]
                        })}
                        >
                            {name}
                        </div>
                    ))}
                </label>
            </div>
        </div>
    )
}