'use client';

import React from 'react'
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent
} from "@/components/ui/sheet"
import useNewAccount from '../hooks/use-new-account'
import { FinancialAccountForm } from './account-form';

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
          <SheetDescription className="text-sm">
            Enter the details below to create a new account.
          </SheetDescription>
        </SheetHeader>
        <FinancialAccountForm />
      </SheetContent>
    </Sheet>
  );
};
