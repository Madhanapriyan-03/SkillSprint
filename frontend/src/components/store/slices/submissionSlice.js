import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import submissionService from '../../services/submissionService';

export const fetchSubmissions = createAsyncThunk('submissions/fetchAll', async ({ page, size }, thunkAPI) => {
  try {
    return await submissionService.getAll(page, size);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const submissionSlice = createSlice({
  name: 'submissions',
  initialState: {
    items: [],
    selectedItem: null,
    loading: false,
    error: null,
    filterByStatus: '',
    totalPages: 0,
    currentPage: 0
  },
  reducers: {
    setFilterByStatus: (state, action) => { state.filterByStatus = action.payload; },
    setSelectedItem: (state, action) => { state.selectedItem = action.payload; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSubmissions.pending, (state) => { state.loading = true; })
      .addCase(fetchSubmissions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || action.payload;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 0;
      })
      .addCase(fetchSubmissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilterByStatus, setSelectedItem } = submissionSlice.actions;
export default submissionSlice.reducer;
