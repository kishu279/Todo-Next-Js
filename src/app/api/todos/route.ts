import prisma from "@/lib/db/prisma";
import { useUser } from "@clerk/nextjs";

export async function GET(request: Request) {
  // const user = await useUser();
  // make it better
  try {
    const response = await prisma.todos.findMany();

    console.log(response);

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);

    return new Response("error while fetching", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
