import express from "express";
import FileController from "../controllers/fileController";
import upload from "../utils/multer";

const router = express.Router();

router.get("/", FileController.allFiles);
router.get("/:id", FileController.downloadFile);
router.post("/upload", upload.single("file"), FileController.upload);
router.delete("/:id", FileController.deleteFile);

export default router;
