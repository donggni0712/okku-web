import api from "./api";

const addPick = async (url) => {
  try {
    const response = await api.post("/picks/new", {
      url: url,
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};

export { addPick };
