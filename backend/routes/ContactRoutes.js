import express from "express";
import { createContact,getAllContact, deleteContact } from "../controllers/contactController.js";


const router=express.Router();

router.post("/",createContact);
router.get("/",getAllContact);
router.delete("/:id",deleteContact);


export default router;