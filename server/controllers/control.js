import cloudinary from "cloudinary";
import { Readable } from "stream";
import client from "../db.js";
import { createReadStream } from "streamifier";

export const getmsg = async (req, res) => {
  try {
    console.log("aa gya");
    const result = await client.query(
      "SELECT name,msg,url,id from mt where room= $1 order by time ",
      [req.query.room],
    );
    res.json({ success: true, mess: result.rows });
  } catch (error) {
        console.log(error.message, " error ho gya ", error.code);
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


export const givemsg = async (req, res) => {
  try {
    const id = req.query.id;

    if (!id) {
      return res
        .status(400)
        .json({ success: false, message: "ID parameter required" });
    }

    const result = await client.query(
      "SELECT name, msg, url, id, qimg FROM mt WHERE id = $1",
      [id],
    );

    if (result.rows.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }

    res.json({ success: true, msg: result.rows[0] });
  } catch (e) {
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const givereply=async (req,res)=>{
  try {
    let msgid = req.query.msgid;
    const result = await client.query(
      "SELECT * FROM reply WHERE mtid = $1 order by createdAt",
      [msgid],
    );
    res.status(200).json({ success: true, replies:result.rows });
  } catch (error) {
    res.status(500).json({success:false, msg:`${error.message}`});
  }
  }
