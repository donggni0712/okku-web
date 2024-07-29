import React from "react";
import Picks from "./components/Picks";
import "./App.css";
const sampleItems = [
  {
    image: "dummy/picks/image1.png",
    price: "53,677원",
    name: "Halter-neck Knit top",
  },
  {
    image: "dummy/picks/image2.png",
    price: "29,900원",
    name: "무테드 슬로건 반팔 티",
  },
  {
    image: "dummy/picks/image3.png",
    price: "31,900원",
    name: "골지 브라 오프더숄더",
  },
  {
    image: "dummy/picks/image3.png",
    price: "31,900원",
    name: "골지 브라 오프더숄더",
  },
  // Add more items as needed
];

const App = () => {
  return (
    <div className="App">
      <Picks picks={sampleItems} />
    </div>
  );
};

export default App;
