import Chat from "@/app/component/Chat/Chat";
import Header from "@/app/component/Header/Header";
import Input from "@/app/component/Input/Input";


export default async function Page({params}) {
  const { slug } = await params;
  
  return <div style={{color:"white",backgroundColor:"white" ,margin:"auto",width:"85%",marginTop:"5vh" ,border:"3px solid white", borderRadius:"10px",height:"80vh",position:"relative",zIndex:"3"}} > 
  <Header  heading={slug} />
  <Chat/>
  <Input/>
  </div>;
}
