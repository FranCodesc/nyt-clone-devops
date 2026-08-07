// nytApi.ts
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export interface Article {
  title: string;
  abstract: string;
  url: string;
  multimedia: { url: string }[] | null;
}

interface NytTopStoriesResponse {
  results: Article[];
}

export async function fetchNews(section: string): Promise<NytTopStoriesResponse> {
  const response = await axios.get<NytTopStoriesResponse>(`${BASE_URL}/api/news/${section}`);
  return response.data;
}