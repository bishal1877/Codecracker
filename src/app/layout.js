import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { StreamChat } from "stream-chat";
import Navabar from "./component/Navbar/Navabar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Codecracker",
  description: "Crack the code.",
};


export default function RootLayout({ children }) {

 const add = async ()=>{
      await channel.addMembers(["red--4",]);

}

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <div>
          <Navabar />
        </div>
        {children}
      </body>
    </html>
  );
}
