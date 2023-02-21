import { signIn, useSession } from "next-auth/react";
import { Container } from "./Container";

export function LoggedOutBanner() {
  const { data: session } = useSession();

  if(session){
    return null;
  }

  return (
    <div className="fixed bottom-0 w-full bg-primary p-4">
      <div className="flex justify-between">
        <p className="text-white py-2">Do not miss out.</p>
        <div>
          <button onClick={() => signIn()} className="px-4 py-2 bg-transparent text-white shadow-md">Sign In</button>
        </div>
      </div>
    </div>
  );
}
