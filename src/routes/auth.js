import express from"express"
 

import { getAll,signup,signin } from "../controllers/auth";
const router =express.Router();
router.post("/signup", signup)
router.post("/signin", signin);
router.get("/users", getAll);
export default router;