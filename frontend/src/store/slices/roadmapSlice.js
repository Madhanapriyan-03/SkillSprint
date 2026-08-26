import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import roadmapService from '../../services/roadmapService';

export const fetchRoadmaps = createAsyncThunk('roadmaps/fetchAll', async ({ page, size }, thunkAPI) => {
  try {
    return await roadmapService.getAll(page, size);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const roadmapSlice = createSlice({
  name: 'roadmaps',
  initialState: {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
    searchQuery: '',
    totalPages: 0,
    currentPage: 0
  },
  reducers: {
    setSearchQuery: (state, action) => { state.searchQuery = action.payload; },
    setSelectedItem: (state, action) => { state.selectedItem = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoadmaps.pending, (state) => { state.loading = true; })
      .addCase(fetchRoadmaps.fulfilled, (state, action) => {
        state.loading = false;
        state.items = (action.payload && action.payload.content) || action.payload || [];
        state.totalPages = (action.payload && action.payload.totalPages) || 0;
        state.currentPage = (action.payload && action.payload.currentPage) || 0;
      })
      .addCase(fetchRoadmaps.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setSearchQuery, setSelectedItem } = roadmapSlice.actions;
export default roadmapSlice.reducer;
