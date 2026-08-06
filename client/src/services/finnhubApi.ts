import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export async function fetchMarket(symbol: string) {
  const response = await axios.get(`${BASE_URL}/api/market/${symbol}`);
  return response.data;
}