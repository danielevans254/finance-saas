import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Coins, Loader2 } from "lucide-react";

export default function SignUpPage() {
  return (
    <div className="min-h-[80vh] flex z-10">
      <div className="h-full w-full flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 pt-12">
          <h1 className="font-bold text-3xl">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}</h1>
        </div>
        <div className="mt-8">
          <ClerkLoading>
            <Loader2 size={48} className="animate-spin" />
          </ClerkLoading>
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
        </div>
      </div>
      <div className="bg-sky-700/70 hidden lg:flex">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Coins size={200} className="text-black" />
        </div>
      </div>
    </div>
  );
}