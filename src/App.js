import React from "react";
import Picks from "./components/Picks";

const sampleItems = [
  {
    image: "path/to/image1.jpg",
    price: "53,677원",
    name: "Halter-neck Knit top",
  },
  {
    image: "path/to/image2.jpg",
    price: "29,900원",
    name: "무테드 슬로건 반팔 티",
  },
  {
    image: "path/to/image3.jpg",
    price: "31,900원",
    name: "골지 브라 오프더숄더",
  },
  {
    image: "path/to/image3.jpg",
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
