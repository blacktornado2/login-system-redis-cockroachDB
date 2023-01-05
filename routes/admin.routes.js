import { Router as expressRouter } from "express";

import { getUsers } from "../controllers/admin.controller.js";

const router = expressRouter();

router.get("/", getUsers);

export default router;
