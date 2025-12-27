import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Axios from '../../api/axiosInstance';

export const getConnections = createAsyncThunk(
  'connections/get-connections',
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(`/connections/card/${cardId}`, { signal });
      return response.data;
    } catch (error) {
      if (error.code === "ERR_CANCELED" || error.name === "CanceledError") {
        return rejectWithValue("İstek iptal edildi");
      }
      if (!error.response) throw error;
      return rejectWithValue(error.response.data?.message || 'Bir hata oluştu');
    }
  }
);

export const removeConnection = createAsyncThunk(
  'connections/remove',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Axios.delete(`/connections/${id}`);
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data?.message || 'Bir hata oluştu');
    }
  }
);

export const blockConnection = createAsyncThunk(
  'connections/block',
  async ({ id }, { rejectWithValue }) => {
    try {
      const response = await Axios.put(`/connections/${id}/block`);
      return response.data;
    } catch (error) {
      if (!error.response) throw error;
      return rejectWithValue(error.response.data?.message || 'Bir hata oluştu');
    }
  }
);

const initialState = {
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  connections: []
};

const ConnectionSlice = createSlice({
  name: 'connection',
  initialState,
  reducers: {
    resetConnections(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(getConnections.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getConnections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        // API response format: {ACCEPTED: [], DECLINED: [], PENDING: []}
        // We only want ACCEPTED connections
        state.connections = action.payload?.ACCEPTED || [];
      })
      .addCase(getConnections.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen bir hata oluştu.";
        state.connections = [];
      })
      .addCase(removeConnection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(removeConnection.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(removeConnection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen bir hata oluştu.";
      })
      .addCase(blockConnection.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(blockConnection.fulfilled, (state) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(blockConnection.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen bir hata oluştu.";
      });
  }
});

export const { resetConnections } = ConnectionSlice.actions;
export default ConnectionSlice.reducer;
