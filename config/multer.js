import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinaryConfig from "./cloudinary.js";

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary: cloudinaryConfig,
  params: {
    folder: "full-stack-blog",
    allowed_formats: ["jpg", "png", "jpeg"],
  },
});

const uploadfile = multer({ storage: cloudinaryStorage });

export default uploadfile;
