import Image from "next/image";
import Link from "next/link";

export const HeaderLogo = () => {
  return (
    <Link href="/">
      <div className="items-center hidden lg:flex space-x-3 group">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="transition-transform duration-300 group-hover:scale-110"
        />
        <p className="font-semibold text-white text-2xl ml-2.5 transition-opacity duration-300 group-hover:opacity-80 lg:hidden hidden">
          {process.env.NEXT_PUBLIC_APP_NAME}
        </p>
      </div>
    </Link>
  );
};