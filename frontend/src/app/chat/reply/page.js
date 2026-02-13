"use client";

import { useSearchParams } from "next/navigation";
import styles from "./page.module.css";
import Replycontainer from "@/app/component/Replycontainer/Replycontainer";

export default function Page() {
   const searchParams = useSearchParams();

   const search = searchParams.get("msgid");
   console.log(search)
  return (
    <div className={`${styles.replyouter}`}>
      <hr />
      <Replycontainer  search ={search}/>
    </div>
  );
}
