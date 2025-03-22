import { todo } from "@/lib/validation/schema";
import prisma from "../../../lib/prisma/db/prisma";

interface todoData {
  // id: number;
  todo: string;
  completed: boolean;
}

// const todos: Array<todoData> = [];

export async function POST(request: Request) {
  const data: todoData = await request.json();

  // data recieved
  // console.log(data);

  // pushing the data to local at server only
  // todos.push(data);

  // validating the data
  const validatedData = todo.safeParse(data);

  if (!validatedData.success) {
    return new Response("Validation Error", {
      status: 400,
      headers: {
        "Contend-Type": "application/json",
      },
    });
  } else {
    console.log("validated");
  }

  try {
    // sending to the prisma
    const response = await prisma.todos.create({
      data,
    });

    console.log(response);

    return new Response(JSON.stringify("created successfully"), {
      status: 200,
      headers: {
        "Contend-Type": "application/json",
      },
    });
  } catch (err) {
    return new Response(err as string, {
      status: 400,
      headers: {
        "Contend-Type": "application/json",
      },
    });
  }

  return new Response(JSON.stringify("The details got successfully"), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}

