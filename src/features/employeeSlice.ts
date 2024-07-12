import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// Async thunk for registering an employee
export const registerEmployee = createAsyncThunk(
  "employee/registerEmployee",
  async (employee, { rejectWithValue }) => {
    const { firstName, lastName, email, password, reTypePassword,companyCode } = employee;
    try {
      const res = await axios.post(
          `${import.meta.env.VITE_USER_URL}/auth/register`,
          { firstName, lastName, email, password, reTypePassword,companyCode }
          );
          console.log(res)
      return res.data; // return only the data
    } catch (err) {
      // Handle the error and return a rejected value
      return rejectWithValue(err.response?.data);
    }
  }
);

// Slice for managing employee registration state
const employeeSlice = createSlice({
    name: "employee",
    initialState: {
        isLoading: false,
        data: {},
        isError: false,
        errorMessage: "",
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerEmployee.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.errorMessage = ""; // Clear previous error messages
            })
            .addCase(registerEmployee.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(registerEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.errorMessage = action.payload?.message || "An error occurred"; // Handle error message
            });
    },
    reducers: undefined
});

export default employeeSlice.reducer;
