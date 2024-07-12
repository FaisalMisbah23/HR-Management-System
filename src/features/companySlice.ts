import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCompany = createAsyncThunk("fetchCompany", async () => {
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/company/`,{withCredentials:true});
    return res.data;
});

const companySlice = createSlice({
    name: "company",
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchCompany.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchCompany.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchCompany.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default companySlice.reducer;
