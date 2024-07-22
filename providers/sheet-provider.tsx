'use client';

import { NewAccountSheet } from "@/features/accounts/components/new-account-sheet";
import { useMountedState } from "react-use";

const SheetProvider = () => {
  const isMounted = useMountedState();

  return isMounted() ? <NewAccountSheet /> : null;
};

export default SheetProvider;