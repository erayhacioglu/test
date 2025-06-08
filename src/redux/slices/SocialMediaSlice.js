import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  socialMediaData:[
    {
        platform:"INSTAGRAM",
        link:"erayhacioglu"
    },
    {
        platform:"INSTAGRAM",
        link:"erayhacioglu"
    },
    {
        platform:"INSTAGRAM",
        link:"erayhacioglu"
    },
    {
        platform:"FACEBOOK",
        link:"erayhacioglu"
    },
    {
        platform:"FACEBOOK",
        link:"erayhacioglu"
    },
    {
        platform:"LINKEDIN",
        link:"erayhacioglu"
    },
    {
        platform:"LINKEDIN",
        link:"erayhacioglu"
    },
    {
        platform:"BEHANCE",
        link:"erayhacioglu"
    },
    {
        platform:"YOUTUBE",
        link:"erayhacioglu"
    },
    {
        platform:"DRIBBLE",
        link:"erayhacioglu"
    },
    {
        platform:"PINTEREST",
        link:"erayhacioglu"
    },
    {
        platform:"SNAPCHAT",
        link:"erayhacioglu"
    },
    {
        platform:"TWITTER",
        link:"erayhacioglu"
    },
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
