import React from "react";
import Pick from "../pick/Pick";
import "./picks.css"; // Create a CSS file for styling
import useGetPicks from "../../hooks/userGetPick";

const Picks = ({
  pickData,
  setPickData,
  cartId,
  isEditing,
  selectedPicks,
  togglePickSelection,
}) => {
  const { getPickLoading, getPickError } = useGetPicks(setPickData, cartId);

  if (getPickLoading) {
    return <div>Loading...</div>;
  }

  if (getPickError) {
    return <div>Error fetching data</div>;
  }
  console.log("dddddasd");
  console.log(pickData);
  return (
    <div className="picks-grid">
      {pickData.picks.map((pick, index) => (
        <Pick
          key={index}
          image={pick.image}
          price={pick.price}
          name={pick.name}
          isSelected={selectedPicks.includes(pick)}
          isEditing={isEditing}
          onClick={() => isEditing && togglePickSelection(pick)}
        />
      ))}
    </div>
  );
};

export default Picks;
