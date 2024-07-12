import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllLeaves = createAsyncThunk("fetchAllLeaves", async () => {
    // in leave type i made a extra one for fetching all employees leave for admin
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/leavetype/allleaves`,{withCredentials:true});    
    console.log("res",res);
    return res.data;
});

const adminAllLeaveSlice = createSlice({
    name: "allleaves",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllLeaves.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllLeaves.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllLeaves.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default adminAllLeaveSlice.reducer;
