import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  marketingAssetsData:[
    {
        id:1,
        coverPhoto:null,
        pdf:null,
        title:"New Metallic Colors 1"
    },
    {
        id:2,
        coverPhoto:null,
        pdf:null,
        title:"New Metallic Colors 2"
    },
    {
        id:3,
        coverPhoto:null,
        pdf:null,
        title:"New Metallic Colors 3"
    },
    {
        id:4,
        coverPhoto:null,
        pdf:null,
        title:"New Metallic Colors 4"
    },
  ]
}

const MarketingAssestsSlice = createSlice({
  name: 'marketingAssets',
  initialState,
  reducers: {
    setMarketingAssetsData(state,action){
        console.log('action.payload', action.payload)
      state.marketingAssetsData = action.payload
    }
  },
})

export const {setMarketingAssetsData} = MarketingAssestsSlice.actions
export default MarketingAssestsSlice.reducer