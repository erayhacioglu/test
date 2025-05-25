import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backgroundImage: null,
  avatarImage: null,
  personalInfo: {
    name: "Eray",
    surname: "Hacıoğlu",
    title: "Frontend Developer",
  },
  contactInfo: [
    {
      contactType: "phone",
      value: "+90 537 882 33 87",
    },
    {
      contactType: "phone",
      value: "+90 537 882 33 87",
    },
    {
      contactType: "whatsapp",
      value: "+90 537 882 33 87",
    },
    {
      contactType: "email",
      value: "eray.hacioglu@ibbgov.tr",
    },
    {
      contactType: "location",
      value: "Gaziosmanpaşa - İstanbul",
    },
  ],
  links: [
    {
      title: "",
      url: "erayhacioglu.com.tr",
    },
    {
      title: "",
      url: "kavio.com.tr",
    },
    {
      title: "",
      url: "loremipsum.com.tr",
    },
  ],
};

const ProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setBackgroundImage(state, action) {
      state.backgroundImage = action.payload;
    },
    setAvatarImage(state, action) {
      state.avatarImage = action.payload;
    },
    setPersonalInfo(state, action) {
      state.personalInfo = action.payload;
    },
    setContactInfo(state, action) {
      state.contactInfo = action.payload;
    },
    setLinks(state, action) {
      state.links = action.payload;
    },
    resetProfile(state) {
      (state.backgroundImage = null),
        (state.avatarImage = null),
        (state.personalInfo = {
          name: "Eray",
          surname: "Hacıoğlu",
          title: "Frontend Developer",
        }),
        (state.contactInfo = [
          {
            contactType: "phone",
            value: "+90 537 882 33 87",
          },
          {
            contactType: "phone",
            value: "+90 537 882 33 87",
          },
          {
            contactType: "whatsapp",
            value: "+90 537 882 33 87",
          },
          {
            contactType: "email",
            value: "eray.hacioglu@ibbgov.tr",
          },
          {
            contactType: "location",
            value: "Gaziosmanpaşa - İstanbul",
          },
        ]),
        (state.links = [
          {
            title: "",
            url: "erayhacioglu.com.tr",
          },
          {
            title: "",
            url: "kavio.com.tr",
          },
          {
            title: "",
            url: "loremipsum.com.tr",
          },
        ]);
    },
  },
});

export const {
  setBackgroundImage,
  setAvatarImage,
  setPersonalInfo,
  setContactInfo,
  setLinks,
  resetProfile
} = ProfileSlice.actions;
export default ProfileSlice.reducer;
