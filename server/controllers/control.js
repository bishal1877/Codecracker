import cloudinary from "cloudinary";
import { Readable } from "stream";
import redisclient from "../redis.js";
import { StreamChat } from "stream-chat";
import { prisma } from "../lib/prisma.js";

export const getmsg = async (req, res) => {
  try {
    const msg = await redisclient.get(req.query.room);
    if (msg) {
      return res.status(200).json({ success: true, mess: msg });
    }
    console.log("aa gya1", req.query.room); 
    const result = await prisma.mt.findMany({
      where: { room: req.query.room },
    });
    await redisclient.set(req.query.room, JSON.stringify(result), {
      ex: 60 * 5,
      nx: true,
    });
    res.json({ success: true, mess: result });
  } catch (error) {
    console.log(error.message, " error ho gya ", error.code);
    res.status(500).json({ success: false, message: "Internal Server Error" });
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
    return res.json({ success: false, message: error.message });
  }
}; 

export const givemsg = async (req, res) => {
  try { 
    const mid = req.query.id;
    if (!mid) {
      return res
        .status(400)
        .json({ success: false, message: "ID parameter required" });
    }
    const msg = await redisclient.get(mid);
    if (msg) {
      return res.status(200).json({ success: true, msg: msg });
    }
    console.log(mid)
    const result = await prisma.mt.findUnique({
      where: { id: Number(mid) },
    });
    if (!result) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found" });
    }
    await redisclient.set(mid, JSON.stringify(result), {
      ex: 60 * 5,
      nx: true,
    });

    res.json({ success: true, msg: result });
  } catch (e) {
    console.log(e.message);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

export const givereply = async (req, res) => {
  try {
    let msgid = req.query.msgid;
    const reply = await redisclient.get(`reply${msgid}`);
    if (reply) {
      return res.status(200).json({ success: true, replies: reply });
    }
    const result = await prisma.reply.findMany({
      where: { mtid: Number(msgid) },
    });
    await redisclient.set(`reply${msgid}`, JSON.stringify(result), {
      ex: 60 * 5,
      nx: true,
    });
    res.status(200).json({ success: true, replies: result });
  } catch (error) {
    res.status(500).json({ success: false, msg: `${error.message}` });
  }
};

export const gettoken=async(req,res)=>{
  try {
const userid=req.query.id;
const api_key = process.env.STREAM_API_KEY;;
const api_secret = process.env.STREAM_SECRET_KEY;
console.log(userid)
   const serverClient = StreamChat.getInstance(api_key, api_secret);
   const token = serverClient.createToken(userid); 
   res.status(200).json({token:token});
  } catch (error) {
    res.status(404).json({msg:`${error.message}`});
  } 
}
