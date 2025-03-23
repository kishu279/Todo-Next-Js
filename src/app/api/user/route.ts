import { currentUser } from "@clerk/nextjs/server";

export async function GET() {
  const user = await currentUser();

  console.log(user);
  console.log(user.id);
  return new Response("USERS");
}
