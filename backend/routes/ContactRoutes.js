import express from "express";
import { createContact,getAllContact, deleteContact } from "../controllers/contactController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";


const router=express.Router();

router.post("/",createContact);
router.get("/", protect, adminOnly, getAllContact);
router.delete("/:id", protect, adminOnly, deleteContact);


export default router;