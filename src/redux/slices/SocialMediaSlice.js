import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialMediaData:[
    {
        platform:"INSTAGRAM",
        link:""
    }
  ]
};

const SocialMediaSlice = createSlice({
  name: "socialMedia",
  initialState,
  reducers: {
    setSocialMediaData(state, action) {
      state.socialMediaData = action.payload;
    },
    resetSocialMedia(state) {
      state.socialMediaData = [
        {
        platform:"INSTAGRAM",
        link:""
    }
      ];
    },
  },
});

export const { setSocialMediaData, resetSocialMedia } =
  SocialMediaSlice.actions;
export default SocialMediaSlice.reducer;
