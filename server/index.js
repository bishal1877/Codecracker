import express, { response } from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import dotenv from "dotenv";
import multer from "multer";
import { clerkClient, clerkMiddleware, getAuth } from "@clerk/express";
import {
  getmsg,
  handlup,
  givemsg,
  givereply,
  gettoken,
  airesp
} from "./controllers/control.js";
import cors from "cors";
import { prisma } from "./lib/prisma.js";
import cloudinary from "cloudinary";
import redisclient from "./redis.js";
  const app = express();
  // const session = require("express-session");
  dotenv.config();
  app.use(express.json());
  // app.use(
  //   session({
  //     secret: "your-secret",
  //     resave: false,
  //     saveUninitialized: true,
  //     cookie: {
  //       sameSite: "none",
  //       secure: process.env.NODE_ENV === "production", // true for HTTPS
  //     },
  //   }),
  // );
  app.use(
    cors({
      origin: [
        "http://localhost:3000",
        "https://codecracker-liard.vercel.app",
      ],
      credentials: true,
      allowedHeaders: ["Content-Type", "Authorization"],
    }),
  ); 
    //  app.use(clerkMiddleware());
    //    app.use( async (req, res, next) => {
    //      const { isAuthenticated, userId } =  getAuth(req);
    //      console.log(isAuthenticated)
    //      if (!isAuthenticated) {
    //        return res.status(401).json({ msg: "User not authenticated" });
    //      }
    //        const user = await clerkClient.users.getUser(userId)
    //        next();
    //    }); 
  const httpServer = createServer(app);
  const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
cloudinary.v2.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
const io = new Server(httpServer, {
  cors: {
    origin: ["https://codecracker-liard.vercel.app", "http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
io.on("connection", (socket) => {
  socket.on("join", ({ room }) => {
    socket.join(room);
  });

  socket.on("sendmsg", async ({ text, naam, room, url, qimg }) => {
    const user = await prisma.mt.create({
      data: {
        msg: text,
        name: naam,
        room:room,
        url:url,
        qimg:qimg
      },
    });
    await redisclient.del(room); 
    io.to(room).emit("message", { name: naam, msg: text ,time:new Date(),id:user.id});
  });

  socket.on("joinforreply", ({ msgid }) => {
    socket.join(msgid);
  });

  socket.on("sendreply", async ({ text, naam, id }, callback) => {
    try {
      const user = await prisma.reply.create({
        data: {
          msg: text,
          author: naam,
          mtid: Number(id),
        },
      });

      await redisclient.del(`reply${id}`); // Invalidate the replies cache

      if (user) {
        callback({ success: true, mess: "send properly!" });
        io.to(id).emit("reply", {
          author: naam,
          msg: text,
          id: user.id,
          createdat: user.createdat,
        });
      } else callback({ success: false, mess: "Failed!" });
    } catch (error) {
      callback({ success: false, mess: error.message });
    }
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
  });
});

app.get("/msg", getmsg);
app.get("/msgbyid", givemsg);
app.post("/upload", upload.single("uploadedfile"), handlup);
app.get("/reply", givereply);
app.get("/token", gettoken);

app.post("/airesponse", airesp);
 
httpServer.listen(4000, () => {
  console.log("server started ho gya ");
});
