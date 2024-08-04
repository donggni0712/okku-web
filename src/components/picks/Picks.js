import React from "react";
import Pick from "../pick/Pick";
import "./picks.css"; // Create a CSS file for styling

const Picks = ({ picks }) => {
  console.log(picks);
  return (
    <div className="picks-grid">
      {picks.map((pick, index) => (
        <Pick
          key={index}
          image={pick.image}
          price={pick.price}
          name={pick.name}
        />
      ))}
    </div>
  );
};

export default Picks;
