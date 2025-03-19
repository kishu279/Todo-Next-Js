"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="select-none">
        <div className="text-[350px] ml-[150px] mt-[100px] absolute font-mono font-extralight italic text-gray-400 ">
          Todo
        </div>
        <hr className="relative top-[380px]" />
        <div className="text-7xl ml-[450px] absolute top-[480px] left-[200px] italic">
          Gives you a way to-do :)
        </div>
      </div>
    </>
  );
}
