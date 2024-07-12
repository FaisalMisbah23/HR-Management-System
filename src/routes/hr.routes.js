import { Router } from "express";
import { getCurrentHr, logoutHr, registerHr, updateAvatarHr, updateProfileHr } from "../controllers/hr.controller.js";
import { loginHr } from "../controllers/hr.controller.js";
import { verifyJwt } from "../middleware/auth.middleware.js";
import { upload } from "../middleware/multer.middware.js";

const router = Router();

router.route("/register").post(registerHr);
router.route("/login").post(loginHr);
router.route("/logout").post(verifyJwt, logoutHr);
router.route("/updateprofile").patch(verifyJwt, updateProfileHr);
router.route("/update/avatar").put(verifyJwt,upload.single("avatar"), updateAvatarHr);
router.route("/").get(verifyJwt, getCurrentHr);


export default router;
