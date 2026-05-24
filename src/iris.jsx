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
    const width = 450;
    const height = 450;

    const [selected_X, setselected_X] = useState(property[0]);
    const [selected_Y, setselected_Y] = useState(property[1]);

    const x = d3.scaleLinear()
    .nice()
    .domain(d3.extent(iris_data, (d) => d[selected_X]))
    .range([50, width - 50]);

    const y = d3.scaleLinear()
    .nice()
    .domain(d3.extent(iris_data, d => d[selected_Y]))
    .range([height - 50, 50]);

    return (
        <div className = "top">
            <h1 className="title">scatter plot of iris data</h1>

            <div className="controls">

                <label>
                    X :
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
                </label>

                <label>
                    Y :
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
                </label>

            </div>

            <div className="chart">
                <svg width = { width } height = { height }>
                    <g>
                        {iris_data.map((item, i) => (
                            <circle key={i} 
                            cx={x(item[selected_X])} 
                            cy={y(item[selected_Y])} 
                            r="5" 
                            fill={dataColor[item.species]} 
                            />
                        ))} 
                    </g>
                </svg>
            </div>
        </div>
    )
}