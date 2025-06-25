import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

import Axios from '../../api/axiosInstance';

export const getAllThemes = createAsyncThunk(
  "themes/sidebar-preview",
  async ({ signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/themes/sidebar-preview`,
        {
          signal,
        }
      );
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        return rejectWithValue("İstek iptal edildi");
      }

      if (!error.response) throw error;

      return rejectWithValue(error.response.data?.message || "Bir hata oluştu");
    }
  }
);

export const getTheme = createAsyncThunk(
  "themes/${id}",
  async ({ id,signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/themes/${id}`,
        {
          signal,
        }
      );
      localStorage.setItem("theme",response?.data?.name);
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        return rejectWithValue("İstek iptal edildi");
      }

      if (!error.response) throw error;

      return rejectWithValue(error.response.data?.message || "Bir hata oluştu");
    }
  }
);

const initialState = {
  isLoading:false,
  isSuccess:false,
  isError:false,
  message:"",
  themes:null,
  themeDetail:null
};

const ThemeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    resetThemes(state){
      state.isLoading = false,
      state.isSuccess = false,
      state.isError = false,
      state.message = ""
    }
  },
  extraReducers:(builder) => {
    builder
    .addCase(getAllThemes.pending,(state) => {
      state.isLoading = true
    }).addCase(getAllThemes.fulfilled,(state,action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.themes = action.payload;
    }).addCase(getAllThemes.rejected,(state,action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = action.payload || "Beklenmeyen bir hata oluştu." 
      state.themes = null;
    })
    .addCase(getTheme.pending,(state) => {
      state.isLoading = true
    }).addCase(getTheme.fulfilled,(state,action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.themeDetail = action.payload;
    }).addCase(getTheme.rejected,(state,action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = action.payload || "Beklenmeyen bir hata oluştu." 
      state.themeDetail = null;
    })
  }
})

export const {setTheme,resetThemes} = ThemeSlice.actions
export default ThemeSlice.reducer