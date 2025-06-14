import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Axios from "../../api/axiosInstance";

export const getCompanyData = createAsyncThunk(
  "profile-management/get-company-page/${cardId}",
  async ({ cardId, signal }, { rejectWithValue }) => {
    try {
      const response = await Axios.get(
        `/profile-management/get-company-page/${cardId}`,
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

export const updateCompanyData = createAsyncThunk(
  "profile-management/update-company-information/${cardId}",
  async ({cardId,updatedData} , { rejectWithValue }) => {
    try {
      const response = await Axios.post(
        `/profile-management/update-company-information/${cardId}`,
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
  isLoading:false,
  isSuccess:false,
  isError:false,
  message:"",
    data : {
      companyInfos: [
        {
            id: 4,
            name: "Acme A.Ş.",
            address: "Levent Mah. No:12 İstanbul",
            taxNo: "1234567890",
            taxBody: "İstanbul Vergi Dairesi",
            cardId: 1
        },
        {
            id: 5,
            name: "Beta Teknoloji Ltd.",
            address: "Ataşehir Bulvarı No:45",
            taxNo: "9876543210",
            taxBody: "Kadıköy Vergi Dairesi",
            cardId: 1
        }
    ],
    bankAccounts: [
        {
            id: 11,
            bankName: "Ziraat Bankası",
            holderName: "Baran Sarıtaş",
            iban: "TR320010009999999999999999"
        },
        {
            id: 12,
            bankName: "İş Bankası",
            holderName: "Baran Sarıtaş",
            iban: "TR450006200000000123456789"
        }
    ]
    }
}

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyData(state,action){
      state.data = action.payload;
    },
    resetCompany(state) {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.message = "";
      state.data = null
    },
  },
  extraReducers: (builder) => {
      builder
        .addCase(getCompanyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(getCompanyData.fulfilled, (state, action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.data = action.payload;
        })
        .addCase(getCompanyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
          state.data = null;
        })
        .addCase(updateCompanyData.pending, (state) => {
          state.isLoading = true;
        })
        .addCase(updateCompanyData.fulfilled, (state,action) => {
          state.isLoading = false;
          state.isSuccess = true;
          state.message = action.payload;
        })
        .addCase(updateCompanyData.rejected, (state, action) => {
          state.isLoading = false;
          state.isSuccess = false;
          state.isError = true;
          state.message = action.payload || "Beklenmeyen Bir Hata Oluştu";
          state.data = null;
        })
    },
});

export const { setCompanyData,resetCompany } =
  CompanySlice.actions;
export default CompanySlice.reducer;
