import { configureStore } from '@reduxjs/toolkit'
import companySlice from './features/companySlice'
import employeeSlice from './features/employeeSlice'
import currentEmpSlice from './features/currentEmpSlice'
import getAllEmployeesSlice from './features/getCompEmpSlice'
import getAllLeaveTypesSlice from './features/getLeaveTypes'
import getAllLeaves from './features/getAllLeaves'
import adminAllLeaveSlice from './features/adminGetAllEmpLeaves'
import getCurrHrSlice from './features/getCurrHrSlice'

export const store = configureStore({
  reducer: {
    company: companySlice,
    employee: employeeSlice,
    currEmp:currentEmpSlice,
    allEmployees:getAllEmployeesSlice,
    leaveTypes:getAllLeaveTypesSlice,
    leaves:getAllLeaves,
    allleaves:adminAllLeaveSlice,
    currHR:getCurrHrSlice
  },
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch