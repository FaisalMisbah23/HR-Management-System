import { Router } from "express";
import { currentEmployee, deleteEmployee, getEmployeeDashboard, getSingleEmployee, loginEmployee, logoutEmployee, registerEmployee, updateAvatarEmployee, updateEmployeeInfo, updateProfileEmp, updateProfileEmployee } from "../controllers/Employee.controller.js";
import { verifyEmployee, verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middware.js";

const router = Router()

router.route("/register").post(registerEmployee)
router.route("/login").post(loginEmployee)
router.route("/logout").post(verifyEmployee,logoutEmployee)
router.route("/").get(verifyEmployee,currentEmployee)
router.route("/updateprofile").patch(verifyEmployee,updateProfileEmployee)
router.route("/update").patch(verifyEmployee,updateProfileEmp)
router.route("/update/avatar").put(verifyEmployee,upload.single("avatar"), updateAvatarEmployee);
router.route("/dashboard").get(verifyEmployee,getEmployeeDashboard);


router.route("/:employeeId").get(verifyJwt,getSingleEmployee)
router.route("/update/:employeeId").patch(verifyJwt,updateEmployeeInfo)
router.route("/delete/:employeeId").delete(verifyJwt,deleteEmployee)





export default router