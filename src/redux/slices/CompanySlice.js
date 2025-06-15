import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const getCompanyData = createAsyncThunk(
  "profile-management/get-company-page/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/profile-management/get-company-page/${cardId}`,
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

export const updateCompanyData = createAsyncThunk(
  "profile-management/update-company-information/${cardId}",
  async ({cardId,updatedData} , { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `/profile-management/update-company-information/${cardId}`,
        updatedData,
      );
      return response.data;
    } catch (error) {
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
  data : null
}

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData(state,action){
      state.data = action.payload;
    },
    resetCompany(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.data = null
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(getCompanyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCompanyData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(getCompanyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
          state.data = null;
        })
        .addCase(updateCompanyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCompanyData.fulfilled, (state,action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload;
        })
        .addCase(updateCompanyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
          state.data = null;
        })
    },
});

export const { setCompanyData,resetCompany } =
  CompanySlice.actions;
export default CompanySlice.reducer;
