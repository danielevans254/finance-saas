'use client'

import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { ClerkLoading, ClerkLoaded } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import { accounts } from '../../db/schema/schema';

export default function Home() {
  const { data, error } = useGetAccounts();
  return (
    <div className="space-y-8 pt-8 px-4">
      <ClerkLoaded>
        {data && (
          <ul className="bg-white shadow-md rounded-lg p-4 space-y-2">
            {data.map((account) => (
              <li key={account.id} className="flex items-center justify-between p-2 border-b last:border-b-0">
                <span className="text-lg font-medium">{account.name}</span>
                <span className="text-sm text-gray-500">#{account.id}</span>
              </li>
            ))}
          </ul>
        )}
      </ClerkLoaded>
      <ClerkLoading>
        <div className="flex flex-col items-center justify-center space-y-2 pb-2">
          <Loader2 className="w-8 h-8 text-black animate-spin" />
          <p className="text-gray-700">Loading accounts</p>
        </div>
      </ClerkLoading>
      {error && <p className="text-red-500 text-center">Error: {error.message}</p>
      }
    </div>
  );
}
