import {
  createItem,
  deleteItemById,
  getItemById,
  getItems,
  getItemsByUserLogedId,
  updateItemById,
} from "../controllers/item";
import { Router } from "express";
import multer from "../libs/multer";
import { validateToken } from "../libs/verifyToken";

const router = Router();

router.route("/items").get(getItems).post(validateToken, multer.single("image"), createItem);

router.route("/items/userloged").get(validateToken, getItemsByUserLogedId);

router
  .route("/items/:id")
  .get(getItemById)
  .put(multer.single("image"), updateItemById)
  .delete(deleteItemById);

export default router;
