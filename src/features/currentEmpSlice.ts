import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchEmployee = createAsyncThunk("fetchEmployee", async () => {
    const res = await axios.get(`${import.meta.env.VITE_USER_URL}/auth/`,{withCredentials:true});
    return res.data;
});

const currEmpSlice = createSlice({
    name: "currEmp",
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchEmployee.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchEmployee.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchEmployee.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default currEmpSlice.reducer;
