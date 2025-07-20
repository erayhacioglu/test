import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const fetchMonthlyStatistics = createAsyncThunk(
  "statistics/fetchMonthlyStatistics",
  async ({ id, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/statistics/${id}/monthly`, { signal });
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

export const fetchInteractions = createAsyncThunk(
  "interactions/fetchInteractions",
  async (cardId, { rejectWithValue, signal }) => {
    try {
      const response = await Axios.get(
        `/card-interaction/${cardId}/interactions`,
        { signal }
      );
      return response.data.interactions || [];
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        return rejectWithValue("İstek iptal edildi");
      }
      if (!error.response) throw error;
      return rejectWithValue(error.response.data?.message || "Bir hata oluştu");
    }
  }
);

export const fetchLocationReport = createAsyncThunk(
  "locationReport/fetchLocationReport",
  async ({ cardId, type, start, end }, { rejectWithValue, signal }) => {
    try {
      const response = await Axios.get(
        `/card-interaction/location-report`,
        {
          params: { cardId, type, start, end },
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

const monthlyStatisticsSlice = createSlice({
  name: "analize",
  initialState: {
    data: [],
    loading: false,
    error: null,
    items: [],
    locationReport: null, 
    locationReportLoading: false,
    locationReportError: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMonthlyStatistics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMonthlyStatistics.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchMonthlyStatistics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Bir hata oluştu";
      })
      .addCase(fetchInteractions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInteractions.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchInteractions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Veri alınamadı";
      })

      .addCase(fetchLocationReport.pending, (state) => {
        state.locationReportLoading = true;
        state.locationReportError = null;
      })
      .addCase(fetchLocationReport.fulfilled, (state, action) => {
        state.locationReportLoading = false;
        state.locationReport = action.payload;
      })
      .addCase(fetchLocationReport.rejected, (state, action) => {
        state.locationReportLoading = false;
        state.locationReportError = action.payload || "Veri alınamadı";
      });
  },
});

export default monthlyStatisticsSlice.reducer;
