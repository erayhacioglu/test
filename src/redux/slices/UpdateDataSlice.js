import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  updatedPage:""
}

const UpdateDataSlice = createSlice({
  name: 'updateData',
  initialState,
  reducers: {
    setUpdatedPage(state,action){
      state.updatedPage = action.payload
    }
  },
})

export const {setUpdatedPage} = UpdateDataSlice.actions
export default UpdateDataSlice.reducer