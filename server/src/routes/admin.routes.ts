import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import { deleteUser, getAllUsers } from "../controllers/admin.controller";

const router = Router();
router.use(authenticate);
router.use(authorizeRole("admin"));

router.get("/users", getAllUsers);
router.delete("/user/:id", deleteUser);

export default router;
