import { blurImage, reduce } from "d3";
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
    const width = 800;
    const height = 800;
    const [selected_X, setselected_X] = useState(property[0]);
    const [selcted_Y, setselected_Y] = useState(property[1]);

    return (
        <div className = "top">
            <h1 className="title">scatter plot of iris data</h1>

            <div className="controls">

                <label>
                    X :
                    <select
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
                        value={selcted_Y}
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
                            cx={item[selected_X] * 80} 
                            cy={height - item[selcted_Y] * 80} 
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