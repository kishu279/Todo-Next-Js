import prisma from "@/lib/prisma/db/prisma";

export async function GET(request: Request) {
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
