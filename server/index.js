import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import  dotenv  from "dotenv";
import multer from 'multer';
import { getmsg,handlup ,givemsg,givereply} from "./controllers/control.js";
import cors from'cors';
import cloudinary from "cloudinary";
const app = express();
import client from "./db.js";
app.use(cors()); 
app.use(express.json()); 

dotenv.config();
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
 
socket.on('join',({room})=>{

socket.join(room);
});

socket.on('sendmsg',async ({text,naam,room,url,qimg})=>{
  await client.query("insert into mt(msg,name,room,url,qimg) values ($1,$2,$3,$4,$5)", [
    text,naam,room,url,qimg
  ]);

io.to(room).emit('message',{name:naam,msg:text});
});

socket.on("joinforreply", ({ msgid }) => {
  console.log(msgid,'sock');
  socket.join(msgid);
});

socket.on("sendreply", async ({ text, naam, id },callback) => {
  try {
    let resp = await client.query(
      "insert into reply(msg,author,mtid) values ($1,$2,$3) returning * ",
      [text, naam, id],
    );
console.log(resp.rows);
if(resp.rows)
   {callback({success:true,mess:"send properly!"}); 
    io.to(id).emit("reply", {
      author: naam,
      msg: text,
      id: resp.rows[0].id,
      createdat: resp.rows[0].createdat,
    });
  }
  else
     callback({ success: false, mess: "Failed!" });    
  } catch (error) {
   callback({ success: false, mess: error.message }); 
  }
});


  socket.on('disconnect',()=>{
  console.log('disconnected');
});
});

app.get('/msg',getmsg);
app.get('/msgbyid',givemsg);
app.post('/upload',upload.single('uploadedfile'),handlup);
app.get('/reply',givereply);


httpServer.listen(4000,()=>{
  console.log('server started ho gya ');
});

