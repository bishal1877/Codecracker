"use client";
import { useContext } from "react";
import { Suspense } from "react";
import Call from "../component/Call/Call.jsx";

function Callcompo()
{
    return  (<div >
        <Call />
        </div>
    );
}
export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Callcompo  />
    </Suspense>
  );
}
