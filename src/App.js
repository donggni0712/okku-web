// src/App.js
import React from "react";
import Picks from "./components/Picks";
import "./App.css";
import useGetPicks from "./hooks/userGetPick";

const App = () => {
  const { getPickData, loading, error } = useGetPicks();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data</div>;
  }

  return (
    <div className="App">
      <Picks picks={getPickData.picks} />
    </div>
  );
};

export default App;
