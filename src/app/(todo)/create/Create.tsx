"use client";

import axios from "axios";
import { ChangeEvent, useEffect, useState } from "react";

// Single Todo
interface todo {
  // id: number;
  todo: string;
  completed: boolean;
}

// Creation of Todos in CreateTodo Page
export function Create() {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<todo[]>([]);

  async function handleSave() {
    // Creating Object
    const newTodo: todo = { todo: todo, completed: false };

    // Saving the object
    // setTodos((prev) => [...prev, newTodo]);
    // instead of storing in frontend server in client side we can just send the request to the backend to save it in db \
    // console.log(newTodo);

    try {
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

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/todos", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => setTodos(res.data));
  }, []);

  return (
    <>
      <div className="mt-[100px] gap-10 display flex">
        <input
          className="border h-[50px] w-[400px] rounded-2xl p-3"
          type="text"
          value={todo}
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

      <div></div>
    </>
  );
}
