import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const getMarketingAssetsData = createAsyncThunk(
  "profile-management/get-catalog-page/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/profile-management/get-catalog-page/${cardId}`,
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

export const getOtherMarketingAssetsData = createAsyncThunk(
  "other-profile-management/get-catalog-page/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/other-profile-management/get-catalog-page/${cardId}`,
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

export const deleteMarketingAssetsData = createAsyncThunk(
  "catalogs/${catalogId}",
  async ({ catalogId }, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(
        `/catalogs/${catalogId}`
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data?.message || "Bir hata oluştu");
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: null,
};

const MarketingAssestsSlice = createSlice({
  name: "marketingAssets",
  initialState,
  reducers: {
    resetMarketingAssets(state) {
      (state.isLoading = false),
        (state.isSuccess = false),
        (state.isError = false),
        (state.message = "");
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMarketingAssetsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMarketingAssetsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action?.payload;
      })
      .addCase(getMarketingAssetsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      })
      .addCase(getOtherMarketingAssetsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getOtherMarketingAssetsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action?.payload;
      })
      .addCase(getOtherMarketingAssetsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      })
      .addCase(deleteMarketingAssetsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteMarketingAssetsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        action.message = action.payload;
      })
      .addCase(deleteMarketingAssetsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
      });
  },
});

export const { resetMarketingAssets } = MarketingAssestsSlice.actions;
export default MarketingAssestsSlice.reducer;
