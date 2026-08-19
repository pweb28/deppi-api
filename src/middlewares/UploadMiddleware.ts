import multer from "multer";
import crypto from "crypto";
import path from "path";

export const upload = multer({
  storage: multer.memoryStorage(),

  limits: {
    fileSize: 5 * 1024 * 1024,
  },

  fileFilter(req, file, callback) {
    const allowedTypes = ["image/png", "image/jpeg", "image/jpg"];

    if (!allowedTypes.includes(file.mimetype)) {
      return callback(new Error("Somente imagens são permitidas"));
    }

    callback(null, true);
  },
});