import axios from "axios";
import api from "./api";
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const movePick = async (
  pickIds,
  sourceCartId,
  destinationCartId,
  isDeleteFromOrigin
) => {
  console.log("caal bmo");
  console.log(pickIds, sourceCartId, destinationCartId);
  try {
    const response = await api.patch(`/picks`, {
      pickIds: pickIds,
      sourceCartId: sourceCartId,
      destinationCartId: destinationCartId,
      isDeleteFromOrigin: isDeleteFromOrigin,
    });
    return response.data;
  } catch (error) {
    console.error("Error move picks:", error);
    throw error;
  }
};

export { movePick };
