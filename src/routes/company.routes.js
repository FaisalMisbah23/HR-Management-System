import { Router } from "express";
import { getAllEmployees, getCompany, getDashboardData, registerCompany, updateCompanyName } from "../controllers/company.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";

const router = Router()

router.route("/register").post(registerCompany)
router.route("/:companyId").patch(updateCompanyName)
router.route("/").get(getCompany)
router.route("/employees").get(getAllEmployees)

router.route("/dashboard").get(getDashboardData)

export default router