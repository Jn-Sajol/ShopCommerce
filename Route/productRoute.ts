import express from "express";
import { isAdminAuth, userAuth } from "../Middleware/userAuth";
import { productCreate, productDelete, productGetAll, ProductGetSingle, productUpdate } from "../Controller/productController";
const router = express.Router();

router.post('/create',[userAuth,isAdminAuth],productCreate)
router.get('/getall',[userAuth,isAdminAuth],productGetAll)
router.get('/getsingle/:id',[userAuth,isAdminAuth],ProductGetSingle)
router.put('/update/:id',[userAuth,isAdminAuth],productUpdate)
router.delete('/delete/:id',[userAuth,isAdminAuth],productDelete)

export default router;