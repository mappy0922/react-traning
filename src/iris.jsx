import { iris_data } from "./iris_data";
import { useState } from "react";

const xproperty = [
    "sepalLength",
    "sepalWidth",
    "petalLength",
    "petalWidth"
];
const yproperty = [
    "sepalLength",
    "sepalWidth",
    "petalLength",
    "petalWidth"
 ];

export default function App() {
    const width = 800;
    const height = 800;
    const [selected_X, setselected_X] = useState(xproperty[0]);
    const [selcted_Y, setselected_Y] = useState(yproperty[1]);

    return (
        <svg width = { width } height = { height }>
            <g>
                {iris_data.map((item, i) => (
                    <circle key={i} cx={item[selected_X] * 80} cy={height - item[selcted_Y] * 80} r="5" />
                ))} 
            </g>
        </svg>
    )
}