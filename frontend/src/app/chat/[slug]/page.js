import Chat from "@/app/component/Chat/Chat";
import Header from "@/app/component/Header/Header";


export default async function Page({params}) {
  const { slug } = await params;
  
  return <div style={{color:"white",backgroundColor:"white" ,margin:"auto",width:"100%",marginTop:"1px" ,border:"3px solid white", borderRadius:"0px 0px 0px 0px", height: "calc(100vh - 70px)",position:"relative",zIndex:"3"}} > 
  <Header  heading={slug} />
  <Chat room={slug} />
  </div>;
}
