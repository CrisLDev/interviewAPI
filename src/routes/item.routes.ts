import { Router } from "express";
import { validateToken } from "../libs/verifyToken";
import { getMe, login, register } from "../controllers/auth";

const router = Router();

router.route("/items").get(register);

router.route("/auth").post(login).get(validateToken, getMe);

export default router;
