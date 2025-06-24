import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import Axios from '../../api/axiosInstance';

export const getUserImages = createAsyncThunk(
  "card/user-images/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/card/user-images/${cardId}`,
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

const initialState = {
  isLoading:false,
  isSuccess:false,
  isError:false,
  message:"",
  bannerImg:null,
  profileImg:null
};

const UserImageSlice = createSlice({
  name: 'userImages',
  initialState,
  reducers: {
    resetUserImages(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.bannerImg = null;
      state.profileImg = null;
    },
  },
  extraReducers:(builder) => {
    builder.addCase(getUserImages.pending, (state) => {
            state.isLoading = true;
          })
          .addCase(getUserImages.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isSuccess = true;
            state.bannerImg = action.payload.bannerImg;
            state.profileImg = action.payload.profileImg;
          })
          .addCase(getUserImages.rejected, (state, action) => {
            state.isLoading = false;
            state.isSuccess = false;
            state.isError = true;
            state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
            state.data = null;
          })
  }
})

export const {resetUserImages} = UserImageSlice.actions
export default UserImageSlice.reducer