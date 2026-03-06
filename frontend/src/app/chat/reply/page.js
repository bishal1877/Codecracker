"use client";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import styles from "./page.module.css";
import Replycontainer from "@/app/component/Replycontainer/Replycontainer";

function ReplyContent() {
  const searchParams = useSearchParams();
  const search = searchParams.get("msgid");

  return (
    <div className={`${styles.replyouter}`}>
      <hr />
      <Replycontainer search={search} />
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ReplyContent />
    </Suspense>
  );
}
