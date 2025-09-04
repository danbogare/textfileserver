import {Request, Response} from "express";
import File from "../models/fileModel";
import { errorResponse, successResponse } from "../utils/serverResponse";

const FileController = {
    upload: async(req: Request, res: Response) => {
    try {
      if (!req.file) {
        return errorResponse(res, "No file uploaded", 400);
      }

      const fileDoc = new File({
        filename: req.file.originalname,
        data: req.file.buffer,
        mimetype: req.file.mimetype,
        size: req.file.size,
      });

      await fileDoc.save();

      return successResponse(res, {fileId: fileDoc._id}, "File uploaded successfully");
    } catch (err: any) {
      return errorResponse(res, err.message || "Upload failed", 500)
    }
  },

  downloadFile: async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return errorResponse(res, "fileId is required", 400);

        const fileDoc = await File.findById(id);
        if (!fileDoc) {
            return errorResponse(res, "File Not Found", 404);
        }

        res.set({
        "Content-Type": fileDoc.mimetype,
        "Content-Disposition": `attachment; filename="${fileDoc.filename}"`,
        });

        res.send(fileDoc.data);
    } catch (err: any) {
        return errorResponse(res, err.message || "Download failed", 500);
    }
  },

  allFiles: async (req: Request, res: Response) => {
    try {
        const files = await File.find({}, { data: 0 });
        return successResponse(res, files, "Files retrieved successfully");
    } catch (err: any) {
        return errorResponse(res, err.message || "Error retrieving files", 500);
    }
  },

  deleteFile: async (req: Request, res: Response) => {
    try {
        const id = req.params.id;
        if (!id) return errorResponse(res, "fileId is required", 400);

        const fileDoc = await File.findByIdAndDelete(id);
        if (!fileDoc) {
            return errorResponse(res, "File Not Found", 404);
        }

        return successResponse(res, {}, "File deleted successfully");
    } catch (err: any) {
        return errorResponse(res, err.message || "Failed to delete", 500);
    }
  },
}

export default FileController;