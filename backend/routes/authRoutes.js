import express from 'express';
import {signupUser, loginUser,getAlluser} from '../controllers/authController.js';
import { adminOnly, protect } from '../middleware/authMiddleware.js';
const router = express.Router();

router.post('/signup',signupUser );
router.post('/login',loginUser );
router.get("/user", protect, adminOnly, getAlluser);



export default router;