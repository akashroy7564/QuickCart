import express from "express";
import { saveAddress, getAddresses, deleteAddress} from "../controllers/addressController.js";
import { protect } from "../middleware/authMiddleware.js";


const router=express.Router();

router.post('/add',protect, saveAddress);
router.get('/:userId',protect, getAddresses);
router.delete("/:id",protect, deleteAddress)

export default router;