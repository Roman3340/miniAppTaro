import axios from "axios";

export interface PlaceSuggestionResponse {
  predictions: {
    description: string;
  }[];
  status: string;
}

export const getPlaceSuggestions = async (
  input: string,
  apiKey: string
): Promise<string[]> => {
  if (!input || input.length < 3) {
    return [];
  }

  const url = "https://maps.googleapis.com/maps/api/place/autocomplete/json";

  const params = {
    input,
    types: "(cities)",
    key: apiKey,
    language: "ru",
  };

  try {
    const response = await axios.get<PlaceSuggestionResponse>(url, { params });
    const predictions = response.data.predictions;
    return predictions.map((p) => p.description);
  } catch (error) {
    console.error("Error fetching Google Place suggestions:", error);
    return [];
  }
};
