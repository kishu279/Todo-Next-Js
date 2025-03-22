import sytles from "@/app/ui/button.module.css";
import Link from "next/link";

export const CreateButton = () => {
  return (
    <>
      <Link
        href="/create"
        className={` h-[80px] w-[350px] text-7xl font-mono italic ${sytles.button}`}
      >
        Create
      </Link>
    </>
  );
};
