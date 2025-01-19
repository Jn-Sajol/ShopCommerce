import express from "express";
import { isAdminAuth, userAuth } from "../Middleware/userAuth";
import { productCreate, productGetAll, ProductGetSingle, productUpdate } from "../Controller/productController";
const router = express.Router();

router.post('/create',[userAuth,isAdminAuth],productCreate)
router.get('/getall',[userAuth,isAdminAuth],productGetAll)
router.get('/getsingle/:id',[userAuth,isAdminAuth],ProductGetSingle)
router.put('/update/:id',[userAuth,isAdminAuth],productUpdate)

export default router;