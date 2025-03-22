"use client";

import { CreateButton } from "@/components/Button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  return (
    <>
      <div className="select-none">
        <div className="text-[350px] ml-[100px] mt-[100px] absolute font-mono font-extralight italic text-gray-400 ">
          Todo
        </div>
        <hr className="relative top-[400px]" />
        <div className="text-7xl ml-[350px] absolute top-[480px] left-[200px] italic">
          Gives you a way to-do :)
        </div>

        <div className="mt-[650px] ml-[1200px]">
          <CreateButton />
        </div>
      </div>
    </>
  );
}
