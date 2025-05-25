import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  companyInfo: [
    {
      name: "Kavio",
      taxNo: "2353465346346535",
      taxBody: "İstanbul",
      address: "7654 sk. Baran Cad. Kartal İstanbul",
    },
  ],
  bankInfo: [
    {
      bankName: "Ziraat Bankası",
      iban: "TR00 7546 8473 0000 7473 1234",
      accountHolder: "Eray Hacıoğlu",
    },
    {
      bankName: "İş Bankası",
      iban: "TR00 7546 8473 0000 7473 1234",
      accountHolder: "Eray Hacıoğlu",
    },
  ],
};

const CompanySlice = createSlice({
  name: "company",
  initialState,
  reducers: {
    setCompanyInfo(state, action) {
      state.companyInfo = action.payload;
    },
    setBankInfo(state, action) {
      state.bankInfo = action.payload;
    },
    resetCompany(state) {
      state.companyInfo = [
        {
          name: "Kavio",
          taxNo: "2353465346346535",
          taxBody: "İstanbul",
          address: "7654 sk. Baran Cad. Kartal İstanbul",
        },
      ];
      state.bankInfo = [
        {
          bankName: "Ziraat Bankası",
          iban: "TR00 7546 8473 0000 7473 1234",
          accountHolder: "Eray Hacıoğlu",
        },
        {
          bankName: "İş Bankası",
          iban: "TR00 7546 8473 0000 7473 1234",
          accountHolder: "Eray Hacıoğlu",
        },
      ];
    },
  },
});

export const { setCompanyInfo, setBankInfo, resetCompany } =
  CompanySlice.actions;
export default CompanySlice.reducer;
