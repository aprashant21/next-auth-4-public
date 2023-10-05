import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function ServerPage() {
  const session = await getServerSession(authOptions);
  return (
    <div className="m-10">
      <h1 className="text-2xl font-bold">Congratulations ! <span className="text-green-700">Welcome to the Server Page</span></h1>
      <div>
        {/* This is for session */}
        {JSON.stringify(session)}
      </div>
      </div>
  )
}
