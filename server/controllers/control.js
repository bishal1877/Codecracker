import cloudinary from "cloudinary";
import { Readable } from "stream";
import client from "../db.js";
import { createReadStream } from "streamifier";

export const getmsg = async (req, res) => {
  try {
    console.log("aa gya");
    const result = await client.query(
      "SELECT name,msg,url from mt where room= $1 order by time ",
      [req.query.room],
    );
    res.json({ success: true, mess: result.rows });
  } catch (e) {
    res.status(404).json({ success: false, message: "Internal Server Error" });
  }
};

export const handlup = async (req, res) => {
  try {
    if (req.file && req.file.buffer) {
       const uploadStream = cloudinary.v2.uploader.upload_stream(
         {
           resource_type: "auto",
           folder: "codecracker",
         },
         (error, result) => {
           if (error) {
             return res.json({ success: false, message: "Upload failed" });
           }
           res.json({
             success: true,
              imageUrl: result.secure_url,
              publicId: result.public_id,
           });
         },
       );
       Readable.from(req.file.buffer).pipe(uploadStream);
      // if (req.file) {
      //   console.log(req.file,' 445fby rbfhr123 ');
      //   let cld_upload_stream = cloudinary.v2.uploader.upload_stream(
      //     { folder: "codecracker", resource_type: "auto" },
      // (error, result) => {
      //      if (error) {
      //        return res.json({ success: false, message: "Upload failed" });
      //      }
      //      res.json({
      //        success: true,
      //         imageUrl: result.secure_url,
      //         publicId: result.public_id,
      //      });
      //    },
      //   );

      //   createReadStream(req.file.buffer).pipe(cld_upload_stream);
      // }
    } else {
     return res.json({ success: false, message: "No file provided" });
    }
  } catch (error) {
  return   res.json({ success: false, msg: error.message });
  }
};
