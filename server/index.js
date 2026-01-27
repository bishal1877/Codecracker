import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from'cors';
const app = express();
import client from "./db.js";
app.use(cors()); 
app.use(express.json()); 

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: "https://codecracker-8xc97yjt6-bbs-projects-6aced6f3.vercel.app/", 
    methods: ["GET", "POST"],
    credentials: true
  },
});
io.on("connection", (socket) => {
  console.log('connected');
 
socket.on('join',({room})=>{

socket.join(room);
});

socket.on('sendmsg',async ({text,naam,room})=>{

  await client.query("insert into mt(msg,name,room) values ($1,$2,$3)", [
    text,naam,room
  ]);

io.to(room).emit('message',{name:naam,msg:text});
});

  socket.on('disconnect',()=>{
  console.log('disconnected');
});
});

app.get('/msg',async (req,res)=>{
  try{
 const result = await client.query("SELECT name,msg from mt where room= $1",[req.query.room]);

res.json({success:true,mess:result.rows});
  }catch{
res.status(404).json({success:false});
  }
});

httpServer.listen(4000);

