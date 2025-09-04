import multer, {FileFilterCallback} from "multer";
import { Request } from "express";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    // check file type
    if (file.mimetype !== "text/plain") {
      return cb(new Error("❌ Only .txt files are allowed"));
    }
    cb(null, true);
  },
});

export default upload;