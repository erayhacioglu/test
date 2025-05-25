import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  updatedPage:null
}

const UpdatePageSlice = createSlice({
  name: 'updatePage',
  initialState,
  reducers: {
    setUpdatedPage(state,action){
      state.updatedPage = action.payload
    }
  },
})

export const {setUpdatedPage} = UpdatePageSlice.actions
export default UpdatePageSlice.reducer