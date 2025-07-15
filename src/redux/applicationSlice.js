import { createSlice } from '@reduxjs/toolkit';

const applicationSlice = createSlice({
  name: 'applications',
  initialState: [],
  reducers: {
    addApplication: (state, action) => {
      state.push(action.payload);
    },
    editApplication: (state, action) => {
      const index = state.findIndex(app => app.id === action.payload.id);
      if (index !== -1) {
        state[index] = action.payload;
      }
    },
    deleteApplication: (state, action) => {
      return state.filter(app => app.id !== action.payload);
    }
  }
});

export const { addApplication, editApplication, deleteApplication } = applicationSlice.actions;
export default applicationSlice.reducer;