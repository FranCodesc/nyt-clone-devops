// finnhubApi.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface MarketQuote {
  c: number;  
  d: number;  
  dp: number; 
  pc: number; 
}

export async function fetchMarket(symbol: string): Promise<MarketQuote> {
  const response = await axios.get<MarketQuote>(`${BASE_URL}/api/market/${symbol}`);
  return response.data;
}