import React from "react";
import Pick from "../pick/Pick";
import "./picks.css"; // Create a CSS file for styling
import useGetPicks from "../../hooks/userGetPick";

const Picks = () => {
  const { getPickData, getPickLoading, getPickError } = useGetPicks();
  if (getPickLoading) {
    return <div>Loading...</div>;
  }

  if (getPickError) {
    return <div>Error fetching data</div>;
  }
  return (
    <div className="picks-grid">
      {getPickData.picks.map((pick, index) => (
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
