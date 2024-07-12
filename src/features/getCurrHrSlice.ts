import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchHR = createAsyncThunk("fetchHR", async () => {
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/auth/`,{withCredentials:true});
    return res.data;
});

const currHRSlice = createSlice({
    name: "currHR",
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchHR.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchHR.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchHR.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default currHRSlice.reducer;
