'use client'

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2, Plus, PlusIcon } from "lucide-react";
import useNewAccount from "@/features/accounts/hooks/use-new-account";
import { Button } from "@/components/ui/button";
import Image from 'next/image';
import { DataTable } from "@/components/ui/data-table";
import { accountColumns } from "@/components/table/accounts-table/columns";

export default function Home() {
  const { data, error } = useGetAccounts();
  const { onOpen } = useNewAccount();

  return (
    <div className="space-y-8 pt-8 px-4">
      <div className="flex justify-end">
        <Button
          onClick={onOpen}
          size="lg"
          className="bg-blue-500 text-white px-4 py-4 rounded-md text-md hover:bg-blue-600 flex items-center"
        >
          <PlusIcon className="w-4 h-4 md:hidden" />
          <span className="hidden md:inline">
            Add new account
          </span>
        </Button>
      </div>
      <ClerkLoaded>
        {data && data.length > 0 ? (
          <div className="container mx-auto py-10">
            {/* TODO: Fix this typescript error */}
            {/* TODO: Make the filter search dynamic */}
            <DataTable filterKey={"name"} columns={accountColumns} data={data} />
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-lg text-gray-700">
            <span className="mb-12 md:text-5xl text-2xl font-semibold">
              No accounts found</span>
            <Image
              src="/illustrations/no_accounts_found.svg"
              alt="Empty"
              layout="responsive"
              width={400}
              height={400}
              className="w-full max-w-xs md:max-w-md lg:max-w-lg"
            />
          </div>
        )}
      </ClerkLoaded>
      <ClerkLoading>
        <div className="flex flex-col items-center justify-center space-y-2 pb-2">
          <Loader2 className="w-8 h-8 text-black animate-spin" />
          <p className="text-gray-700">Loading accounts</p>
        </div>
      </ClerkLoading>
      {
        error && (
          <p className="text-red-500 text-center">
            Error: {error.message}
          </p>
        )
      }
    </div >
  );
}
