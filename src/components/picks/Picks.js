import React from "react";
import Pick from "../pick/Pick";
import "./picks.css";
import useGetPicks from "../../hooks/userGetPick";
import { useNavigate } from "react-router-dom"; // useNavigate 훅을 사용합니다

const Picks = ({
  pickData,
  setPickData,
  cartId,
  isEditing,
  selectedPicks,
  togglePickSelection,
}) => {
  const { getPickLoading, getPickError } = useGetPicks(setPickData, cartId);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 navigate 함수를 가져옵니다

  const accessItem = (pickId) => {
    navigate(`/pick/${pickId}`);
  };

  if (getPickLoading) {
    return <div>Loading...</div>;
  }

  if (getPickError) {
    return <div>Error fetching data</div>;
  }

  const handleClick = (pick) => {
    if (isEditing) {
      togglePickSelection(pick);
    } else {
      accessItem(pick.id);
    }
  };

  return (
    <div className="picks-grid">
      {pickData.picks.map((pick) => (
        <Pick
          key={pick.id} // id를 key로 사용하는 것이 좋습니다
          image={pick.image}
          price={pick.price}
          name={pick.name}
          isSelected={selectedPicks.includes(pick)}
          isEditing={isEditing}
          onClick={() => handleClick(pick)} // 클릭 핸들러 설정
        />
      ))}
    </div>
  );
};

export default Picks;
