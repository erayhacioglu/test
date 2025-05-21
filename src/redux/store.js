import { configureStore } from '@reduxjs/toolkit';
import updateDataReducer from "./slices/UpdateDataSlice";

const store = configureStore({
  reducer: {
    updateData:updateDataReducer
  },
})

export default store;