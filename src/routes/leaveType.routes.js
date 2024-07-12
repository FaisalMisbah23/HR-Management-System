import { Router } from "express";
import {
  createLeaveType,
  deleteLeaveType,
  getLeaveTypes,
  updatedLeaveType,
} from "../controllers/leaveType.controller.js";
import { getallLeaves, toggleLeaveStatus } from "../controllers/Leave.controller.js";
const router = Router();

// leave setting routes
router.route("/create").post(createLeaveType);
router.route("/:leavePlanId").patch(updatedLeaveType);
router.route("/:leavePlanId").delete(deleteLeaveType);
router.route("/").get(getLeaveTypes);

// leave toogle route
router.route("/toggleleavestatus/:leaveId").patch(toggleLeaveStatus)

// get all leaves
router.route("/allleaves/").get(getallLeaves)


export default router;
