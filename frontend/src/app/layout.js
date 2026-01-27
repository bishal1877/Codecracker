import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navabar from "./component/Navbar/Navabar";
import { ClerkProvider } from "@clerk/nextjs";

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
    <ClerkProvider>
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable}`}>
          <div>
            <Navabar />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
