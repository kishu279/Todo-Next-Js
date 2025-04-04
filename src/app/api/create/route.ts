import { todo } from "@/lib/validation/schema";
import prisma from "../../../lib/db/prisma";

interface todoData {
  // id: number;
  userId: string;
  todo: string;
  completed: boolean;
}

// const todos: Array<todoData> = [];

export async function POST(request: Request) {
  const data: todoData = await request.json();

  console.log(data);

  // validating the data
  const validatedData = todo.safeParse(data);

  if (!validatedData.success) {
    return new Response("Validation Error", {
      status: 400,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } else {
    console.log("validated");
  }

  try {
    // sending to the prisma
    const response = await prisma.todos.create({
      data: validatedData.data,
    });

    // const response = await prisma.todos.upsert({
    //   where: { userId: validatedData.data },
    //   update: {
    //     todo: validatedData.data.todo,
    //     completed: validatedData.data.completed,
    //   },
    //   create: validatedData.data,
    // });

    console.log(response);

    return new Response(JSON.stringify("created successfully"), {
      status: 200,
      headers: {
        "Contend-Type": "application/json",
      },
    });
  } catch (err) {
    console.log(err);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 400,
      headers: {
        "Contend-Type": "application/json",
      },
    });
  }
}
