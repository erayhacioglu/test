import { configureStore } from '@reduxjs/toolkit';
import updatePageReducer from "./slices/UpdatePageSlice";
import profileReducer from "./slices/ProfileSlice";
import companyReducer from "./slices/CompanySlice";
import socialMediaReducer from "./slices/SocialMediaSlice";

const store = configureStore({
  reducer: {
    updatePage:updatePageReducer,
    profile:profileReducer,
    company:companyReducer,
    socialMedia:socialMediaReducer
  },
})

export default store;