import { UserButton, ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import HeaderLogo from "./header-logo";
import Navigation from "./navigation";
import { Loader2 } from "lucide-react";
import WelcomeMessage from "./welcome-message";

const Header = () => {
  return (
    <header className="bg-gradient-to-b from-blue-700 to-blue-500 px-4 py-8 lg:px-14 lg:pb-36">
      <div className="max-w-screen-3xl mx-auto">
        <div className="w-full flex justify-between mb-14">
          <div className="flex items-center lg:gap-x-16">
            <HeaderLogo />
            <Navigation />
          </div>
          <ClerkLoaded>
            <UserButton />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="size-8 text-white animate-spin flex flex-col items-center justify-center mt-2" />
          </ClerkLoading>
        </div>
        <WelcomeMessage />
      </div>
    </header>
  );
}

export default Header;