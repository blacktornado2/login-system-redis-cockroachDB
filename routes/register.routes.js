import { Router as expressRouter } from "express";

import { registerUser } from "../controllers/register.controller.js";

const router = expressRouter();

router.post('/', registerUser)

export default router;