import axios from "axios";
import api from "./api";

const addPick = async (url) => {
  try {
    const response = await api.post("/picks/new", {
      url: url,
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error("Error adding pick:", error);
    throw error;
  }
};

export { addPick };
