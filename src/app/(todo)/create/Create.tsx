"use client";

import { todo } from "@/lib/validation/schema";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

// Single Todo
interface todoType {
  // id: number;
  id?: number;
  todo: string;
  completed: boolean;
}

// Creation of Todos in CreateTodo Page
export function Create() {
  const [todoText, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<todoType[]>([]);
  const [userId, setUserId] = useState<string>("");

  const { isSignedIn, user, isLoaded } = useUser();

  async function handleSave() {
    // Creating Object
    // upon each request we are sending the userId to differentiate

    try {
      //valiate the data
      const newTodo = todo.parse({
        userId: userId,
        todo: todoText,
        completed: false,
      });

      const response = await axios.post(
        "http://localhost:3000/api/create",
        newTodo,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // response will be there showing that successfully created
      console.log(response);

      if (response.status == 200) {
        alert(response.data);
      } else {
        console.error(response.data);
      }
    } catch (err) {
      throw new Error(err as string);
    }
  }

  async function handleUser() {
    const { user, isLoaded, isSignedIn } = useUser();

    if (isLoaded && isSignedIn) [setUserId(user.id)];
  }

  useEffect(() => {
    axios
      .get("/api/todos", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setTodos(res.data));

    handleUser();
  }, []);

  // useEffect(() => {
  //   console.log(todos);
  // }, [todos]);

  return (
    <>
      <div className="mt-[100px] gap-10 display flex">
        <input
          className="border h-[50px] w-[400px] rounded-2xl p-3"
          type="text"
          value={todoText}
          onChange={(e: ChangeEvent<HTMLInputElement>) => {
            setTodo(e.target.value);
          }}
          placeholder="Add Todos..."
        />
        <button
          className="border border-white p-3 rounded-3xl"
          onClick={() => {
            handleSave();
          }}
        >
          save
        </button>
      </div>

      <div>
        {todos.map((todo) => (
          <div key={todo.id}>
            <p>{todo.todo}</p>
            <input
              type="checkbox"
              // value={todo.completed}
              onClick={() => {
                todo.completed = true;
              }}
            />
          </div>
        ))}
      </div>
    </>
  );
}
