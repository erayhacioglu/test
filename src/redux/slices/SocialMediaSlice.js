import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const getSocialMediaData = createAsyncThunk(
  "profile-management/get-social-medias/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/profile-management/get-social-medias/${cardId}`,
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

export const getSocialMediaPlatformsData = createAsyncThunk(
  "social-media-platforms/social-media-platforms",
  async ({ signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/social-media-platforms/social-media-platforms`,
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

export const updateSocialMedia = createAsyncThunk(
  "social-media-platforms/bulk-update/${cardId}",
  async ({ cardId, updatedData }, { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `/social-media-platforms/bulk-update/${cardId}`,
        updatedData
      );
      return response.data;
    } catch (error) {
      if (!error.response) throw error;

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
  socialMediaPlatforms: null,
  addedSocialMediaPlatforms: [],
};

const SocialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setAddedSocialMediaPlatforms(state, action) {
      state.addedSocialMediaPlatforms = action.payload;
    },
    setUpdateSocialMedia(state, action) {
      state.data = action.payload;
    },
    resetSocialMedia(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.data = null;
      state.socialMediaPlatforms = null;
      state.addedSocialMediaPlatforms = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getSocialMediaData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSocialMediaData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getSocialMediaData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      })
      .addCase(getSocialMediaPlatformsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getSocialMediaPlatformsData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.socialMediaPlatforms = action.payload;
      })
      .addCase(getSocialMediaPlatformsData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.socialMediaPlatforms = null;
      })
      .addCase(updateSocialMedia.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSocialMedia.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateSocialMedia.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      });
  },
});

export const {
  setAddedSocialMediaPlatforms,
  setUpdateSocialMedia,
  resetSocialMedia,
} = SocialMediaSlice.actions;
export default SocialMediaSlice.reducer;
