import { createSlice } from '@reduxjs/toolkit';
const getInitialTheme = () => {
  const savedTheme = localStorage.getItem('isDarkMode');
  return savedTheme !== null ? JSON.parse(savedTheme) : false; 
};

const initialState = {
  isDarkMode: getInitialTheme(), 
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      localStorage.setItem('isDarkMode', JSON.stringify(state.isDarkMode));
    },
  },
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;