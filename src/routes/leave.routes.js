import { Router } from "express";
import { createLeave, getEmployeeLeaves, updateLeave } from "../controllers/Leave.controller.js";
import { getEmployeeTargets } from "../controllers/Target.controllers.js";

const router = Router()

router.route("/").post(createLeave)
router.route("/").get(getEmployeeLeaves)
router.route("/:leaveId").patch(updateLeave)

// <-- get all leave also in admin --> in leaveType.route.js

// current employee target from target.conrollers.js
router.route("/curremptarget/").get(getEmployeeTargets)

router.route

export default router