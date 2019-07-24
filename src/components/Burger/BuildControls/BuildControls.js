import React from "react";

import BuildControl from "./BuildControl/BuildControl";
import "./BuildControls.css";

const Controls = [
  {
    label: "Salad",
    type: "salad"
  },
  {
    label: "Bacon",
    type: "bacon"
  },
  {
    label: "Cheese",
    type: "cheese"
  },
  {
    label: "Meat",
    type: "meat"
  }
];

const BuildControls = props => {
  return (
    <div className="buildControls">
    <p>Current Price: {props.price.toFixed(2)}</p>
      {Controls.map(ctrl => (
        <BuildControl
          key={ctrl.label}
          label={ctrl.label}
          added={() => props.addIngredients(ctrl.type)}
          removed={() => props.removeIngredients(ctrl.type)}
          disabled={props.disabled[ctrl.type]}
        />
      ))}
    </div>
  );
};

export default BuildControls;
