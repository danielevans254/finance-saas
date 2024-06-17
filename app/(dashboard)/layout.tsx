import Header from "@/components/header";
import { UserButton } from "@clerk/nextjs";

type Props = {
  children: React.ReactNode;
};
const DashboardLayout = ({ children }: Props) => {
  return (
    <>
      <Header />
      <main className="px-3 lg:px-14">
        {children}
      </main>
    </>

  );
}

export default DashboardLayout;