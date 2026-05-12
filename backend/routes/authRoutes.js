import express from 'express';
import {signupUser, loginUser,getAlluser} from '../controllers/authController.js';
const router = express.Router();

router.post('/signup',signupUser );
router.post('/login',loginUser );
router.get("/user",getAlluser);




export default router;