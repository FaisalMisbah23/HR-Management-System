import { Router } from "express";
import { addKpiScore, createTarget, deleteTarget, getEmployeeTargets, getSingleTarget, getTargets, updateTarget } from "../controllers/Target.controllers.js";
const router = Router();

router.route("/create").post(createTarget)
router.route("/:targetId").patch(updateTarget)
router.route("/:targetId").delete(deleteTarget)
router.route("/:targetId").get(getSingleTarget)
router.route("/addkpiscore/:targetId").post(addKpiScore)
router.route("/").get(getTargets)


export default router;
