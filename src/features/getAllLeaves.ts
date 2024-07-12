import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLeaves = createAsyncThunk("fetchLeaves", async () => {
    const res = await axios.get(`${import.meta.env.VITE_USER_URL}/leave/`,{withCredentials:true});
    return res.data;
});

const getAllLeaveSlice = createSlice({
    name: "leaves",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaves.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeaves.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchLeaves.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default getAllLeaveSlice.reducer;
