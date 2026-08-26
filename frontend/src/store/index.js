import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import roadmapReducer from './slices/roadmapSlice';
import enrollmentReducer from './slices/enrollmentSlice';
import submissionReducer from './slices/submissionSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    roadmaps: roadmapReducer,
    enrollments: enrollmentReducer,
    submissions: submissionReducer
  },
});

export default store;