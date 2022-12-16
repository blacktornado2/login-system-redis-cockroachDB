import { Router as expressRouter } from "express";

import { loginUser } from "../controllers/login.controller.js";

const router = expressRouter();

router.post("/", loginUser);

export default router;
