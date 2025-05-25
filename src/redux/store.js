import { configureStore } from '@reduxjs/toolkit';
import updatePageReducer from "./slices/UpdatePageSlice";
import profileReducer from "./slices/ProfileSlice";
import companyReducer from "./slices/CompanySlice";

const store = configureStore({
  reducer: {
    updatePage:updatePageReducer,
    profile:profileReducer,
    company:companyReducer
  },
})

export default store;