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
    if (!userId) {
      throw new Error("ueser objk");
    }
    // Creating Object
    // upon each request we are sending the userId to differentiate

    try {
      //valiate the data
      const newTodo = todo.parse({
        userId: userId,
        todo: todoText,
        completed: false,
      });

      console.log(newTodo);

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
      // throw new Error(err.message);
      console.error("ERror Occurred");
    }
  }

  async function handleUser() {}

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

  useEffect(() => {
    console.log(todos);

    if (isLoaded && isSignedIn) {
      setUserId(user.id);
    }

    // console.log(user);
  }, [todos, userId]);

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
          className="border border-white p-3 rounded-3xl "
          onClick={() => {
            handleSave();
          }}
        >
          +
        </button>
      </div>

      <div className=" h-[500px] mt-[50px] overflow-y-auto cursor-pointer select-none">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className=" flex rounded-3xl p-3 hover:bg-amber-300 "
          >
            <p
              onClick={() => {
                console.log("clicked");

                
              }}
              className={`w-[500px] overflow-hidden text-ellipsis whitespace-nowrap hover:whitespace-normal ${
                !todo.completed ? console.log("false") : console.log("true")
              }`}
            >
              {todo.todo}
            </p>
          </div>
        ))}
      </div>
    </>
  );
}
