import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLeaveTypes = createAsyncThunk("fetchLeaveTypes", async () => {
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/leavetype/`,{withCredentials:true});
    return res.data;
});

const getAllLeaveTypesSlice = createSlice({
    name: "leaveTypes",
    initialState: {
        isLoading: false,
        data: [],
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchLeaveTypes.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchLeaveTypes.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchLeaveTypes.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default getAllLeaveTypesSlice.reducer;
