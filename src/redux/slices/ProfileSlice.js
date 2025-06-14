import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const getProfileData = createAsyncThunk(
  "profile-management/get-profile/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/profile-management/get-profile/${cardId}`,
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

export const updateProfileData = createAsyncThunk(
  "profile-management/update-personel-information",
  async (updatedData , { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `/profile-management/update-personel-information`,
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
  isLoading: false,
  isSuccess: false,
  isError: false,
  message: "",
  data: {
    cardId: 1,
    userInfo: {
      firstName: "Baran",
      lastName: "Sarıtaş",
      bio: "Yazılım geliştirici",
    },
    contactInfos: [
      {
        id: 5,
        contactType: "email",
        value: "baran@example.com",
      },
      {
        id: 6,
        contactType: "phone",
        value: "+905551112233",
      },
    ],
    links: [
      {
        id: 8,
        value: "https://linkedin.com/in/baransaritas",
        title: "LinkedIn",
        position: 1,
      },
      {
        id: 9,
        value: "https://github.com/baransaritas",
        title: "GitHub",
        position: 2,
      },
    ],
  },
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfileData(state,action){
      state.data = action.payload;
    },
    resetProfile(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProfileData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.data = action.payload;
      })
      .addCase(getProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      })
      .addCase(updateProfileData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProfileData.fulfilled, (state,action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.message = action.payload;
      })
      .addCase(updateProfileData.rejected, (state, action) => {
        state.isLoading = false;
        state.isSuccess = false;
        state.isError = true;
        state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
        state.data = null;
      })
  },
});

export const { setProfileData,resetProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
