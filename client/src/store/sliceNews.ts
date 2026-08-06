import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchNews } from "../services/nytApi";

export const fetchNewsThunk = createAsyncThunk(
  "news/fetchNews",
  async (section: string) => {
    const data = await fetchNews(section);
    return data;
  },
);


//type
interface NewsState {
  articles: any[];
  selectedSection: string;
  loading: boolean;
  error: string | null;
}

//initial state
const initialState: NewsState = {
  articles: [],
  selectedSection: "home",
  loading: false,
  error: null,
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setSelectedSection: (state, action) => {
      state.selectedSection = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNewsThunk.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchNewsThunk.fulfilled, (state, action) => {
        state.loading = false;
        state.articles = action.payload.results;
      })
      .addCase(fetchNewsThunk.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message ?? "Errore sconosciuto";
      });
  },
});

export const { setSelectedSection } = newsSlice.actions;
export default newsSlice.reducer;
