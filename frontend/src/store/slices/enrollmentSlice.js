import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import enrollmentService from '../../components/services/enrollmentService';

export const fetchEnrollments = createAsyncThunk('enrollments/fetchAll', async ({ page, size }, thunkAPI) => {
  try {
    return await enrollmentService.getAll(page, size);
  } catch (error) {
    return thunkAPI.rejectWithValue(error.response?.data?.message || error.message);
  }
});

export const enrollmentSlice = createSlice({
  name: 'enrollments',
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
      .addCase(fetchEnrollments.pending, (state) => { state.loading = true; })
      .addCase(fetchEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.content || action.payload;
        state.totalPages = action.payload.totalPages || 0;
        state.currentPage = action.payload.currentPage || 0;
      })
      .addCase(fetchEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setFilterByStatus, setSelectedItem } = enrollmentSlice.actions;
export default enrollmentSlice.reducer;
