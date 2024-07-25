'use client';

import { z } from 'zod';
import {
  Sheet,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetContent
} from "@/components/ui/sheet"
import useNewAccount from '../hooks/use-new-account'
import { FinancialAccountForm } from './account-form';
import { financialAccountFormSchema } from '@/zod/schema';
import { usePostAccount } from '../api/use-post-account';
import { useMountedState } from "react-use";

type FormValues = z.infer<typeof financialAccountFormSchema>;

export const NewAccountSheet = () => {
  const { isOpen, onClose } = useNewAccount();
  const isMounted = useMountedState();
  const mutation = usePostAccount();

  // FIXME: Fix the custom variant of the form
  const onSubmit = (values: FormValues) => {
    mutation.mutate(values)
  }

  if (!isMounted()) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Create a new account</SheetTitle>
          <SheetDescription className="text-sm">
            Enter the details below to create a new account.
          </SheetDescription>
        </SheetHeader>
        <FinancialAccountForm
          disabled={mutation.isPending}
          defaultValues=
          {{
            name: '',
            category: '',
            type: '',
            customAccountName: '',
            customTypeName: ''
          }}
          onSubmit={onSubmit} />
      </SheetContent>
    </Sheet>
  );
};