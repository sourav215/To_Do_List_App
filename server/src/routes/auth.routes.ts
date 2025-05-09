import {Router} from "express";
import { loginUser, registerNewUser } from "../controllers/auth.controller";

const router = Router();

router.post('/register', registerNewUser);
router.post('/login', loginUser);

export default router;
