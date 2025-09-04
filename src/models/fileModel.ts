import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  filename: string;
  data: Buffer;
  mimetype: string;
  size: number;
}

const fileSchema = new Schema<IFile>({
  filename: { type: String, required: true },
  data: { type: Buffer, required: true },
  mimetype: { type: String, required: true },
  size: { type: Number, required: true },
}, { timestamps: true });

const File = mongoose.model<IFile>("File", fileSchema);
export default File;
