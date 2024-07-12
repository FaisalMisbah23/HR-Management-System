import express, { json } from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

const app = express();
dotenv.config();
app.use(cookieParser())

app.use(
  cors({
    // origin: process.env.ORIGIN,
    origin:process.env.LOCAL_ORIGIN,
    credentials: true,
  })
);
app.use(express.json({limit: "10mb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"));

import hrRouter from "./routes/hr.routes.js";
import companyRouter from "./routes/company.routes.js";
import { verifyEmployee, verifyJwt } from "./middleware/auth.middleware.js";
import employeeRouter from "./routes/employee.route.js";
import leaveSettingRouter from './routes/leaveType.routes.js'
import leaveRouter from './routes/leave.routes.js'
import targetRouter from './routes/target.routes.js'
import { getDashboardData } from "./controllers/company.controller.js";

// admin routes
app.use("/api/v1/admin/auth", hrRouter);
app.use("/api/v1/admin/company", verifyJwt, companyRouter);
app.use("/api/v1/admin/leavetype", verifyJwt, leaveSettingRouter);
app.use("/api/v1/admin/target", verifyJwt, targetRouter);



// leavetoogle

// user routes
app.use("/api/v1/user/auth", employeeRouter);
app.use("/api/v1/user/leave",verifyEmployee,leaveRouter);

export default app;
