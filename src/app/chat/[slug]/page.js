export default async function Page({ params }) {
  const { slug } = await params;
  return <div style={{color:"white"}} >My Post: {slug}</div>;
}
