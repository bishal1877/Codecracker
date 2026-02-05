import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import multer from 'multer';
import { getmsg,handlup } from "./controllers/control.js";
import cors from'cors';
import cloudinary from "cloudinary";
const app = express();
import client from "./db.js";
app.use(cors()); 
app.use(express.json()); 

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
    origin: ["https://codecracker-liard.vercel.app","http://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true
  },
});
io.on("connection", (socket) => {
  console.log('connected');
 
socket.on('join',({room})=>{

socket.join(room);
});

socket.on('sendmsg',async ({text,naam,room,url,qimg})=>{
  await client.query("insert into mt(msg,name,room,url,qimg) values ($1,$2,$3,$4,$5)", [
    text,naam,room,url,qimg
  ]);

io.to(room).emit('message',{name:naam,msg:text});
});

  socket.on('disconnect',()=>{
  console.log('disconnected');
});
});

app.get('/msg',getmsg);
app.post('/upload',upload.single('uploadedfile'),handlup);

httpServer.listen(4000);

