import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Coins, Loader2 } from "lucide-react";
import Image from "next/image";

export default function SignInPage() {
  return (
    <div className="min-h-screen h-full w-full grid grid-cols-1 lg:grid-cols-2 z-10">
      <div className="flex flex-col items-center justify-center px-4">
        <div className="text-center space-y-8 pt-12 lg:hidden">
          <h1 className="font-bold text-3xl">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
          </h1>
          <p className="text-lg">Please sign in to access your account.</p>
        </div>
        <div className="my-8">
          <ClerkLoading>
            <div className="flex flex-col items-center justify-center">
              <Loader2 size={48} className="animate-spin" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
        </div>
      </div>
      <div className="bg-sky-500/70 hidden lg:flex">
        <div className="flex flex-col items-center justify-center w-full h-full">
          <Image src="/logo.svg" width={400} height={400} alt="logo" />
          <div className="text-center space-y-8 pt-12">
            <h1 className="font-bold text-5xl">Welcome to {process.env.NEXT_PUBLIC_APP_NAME}
            </h1>
            <p className="text-2xl">Please sign in to access your account.</p>
          </div>
        </div>
      </div>
    </div>
  );
}