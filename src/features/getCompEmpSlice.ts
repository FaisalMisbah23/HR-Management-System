import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllEmployees = createAsyncThunk("fetchAllEmployees", async () => {
    const res = await axios.get(`${import.meta.env.VITE_ADMIN_URL}/company/employees`,{withCredentials:true});
    return res.data;
});

const getAllEmployeesSlice = createSlice({
    name: "allEmployees",
    initialState: {
        isLoading: false,
        data: {},
        isError: false
    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllEmployees.pending, (state, action) => {
            state.isLoading = true;
        });
        builder.addCase(fetchAllEmployees.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
        });
        builder.addCase(fetchAllEmployees.rejected, (state, action) => {
            state.isLoading = false;
            state.isError = true;
        });
    },
    reducers: undefined
});

export default getAllEmployeesSlice.reducer;
