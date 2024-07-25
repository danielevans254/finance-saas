'use client';
import { useState } from 'react';

import { Button } from "@/components/ui/button";
import {
  FormProvider,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, ChevronsUpDown, Plus, RotateCcw, Save, Trash2 } from "lucide-react";

import { financialAccountCategories, financialAccountTypes } from "@/constants/financial-accounts-types";
import { financialAccountFormSchema } from '@/zod/schema';


type FormValues = z.infer<typeof financialAccountFormSchema>;

type Props = {
  id?: string,
  defaultValues?: {
    name: string,
    category: string,
    type: string,
    customAccountName: string,
    customTypeName: string,
  },
  onSubmit: (values: FormValues) => void,
  onDelete?: () => void
  disabled?: boolean,
};

export const FinancialAccountForm = ({
  id,
  defaultValues,
  onSubmit,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(financialAccountFormSchema),
    defaultValues: defaultValues,
  });

  // FIXME: Whatever the fuck this is.. Warning: A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [accountTypeValue, setAccountTypeValue] = useState('');
  const [customAccountName, setCustomAccountName] = useState('');
  const [customAccountType, setCustomAccountType] = useState('');

  const categories = Array.isArray(financialAccountCategories) ? financialAccountCategories : [];

  const accountTypes = financialAccountTypes[categoryValue] || [];

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    setCategoryValue(value);
    setAccountTypeValue('');
    form.setValue('type', '');
  };

  // TODO: Put this in a separate constants file
  const handleClear = () => {
    form.reset();
    setCategoryValue('');
    setAccountTypeValue('');
    setCustomAccountName('');
    setCustomAccountType('');
    console.log("Clearing Fields")
  };

  const handleDelete = () => {
    console.log("Deleting Account")
  }

  const handleSubmit = (values: FormValues) => {
    onSubmit(values);
  }

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Name</FormLabel>
                <FormControl>
                  <Input placeholder="Account Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Account Category</FormLabel>
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        aria-expanded={categoryOpen}
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                        onClick={() => setCategoryOpen(!categoryOpen)}
                      >
                        {categoryValue
                          ? categories.find((category) => category.value === categoryValue)?.label
                          : "Select account category"}
                        <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput placeholder="Search account category..." />
                      <CommandEmpty>No category found.</CommandEmpty>
                      <CommandGroup>
                        {categories.map((category) => (
                          <CommandItem
                            key={category.value}
                            value={category.value}
                            onSelect={(currentValue) => {
                              handleCategoryChange(currentValue);
                              setCategoryOpen(false);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${categoryValue === category.value ? "opacity-100" : "opacity-0"}`}
                            />
                            {category.label}
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          {categoryValue && (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  {categoryValue !== "custom" ? (
                    <Popover open={accountTypeOpen} onOpenChange={setAccountTypeOpen}>
                      <FormLabel>Account Type</FormLabel>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={accountTypeOpen}
                            className={cn(
                              "w-full justify-between",
                              !field.value && "text-muted-foreground"
                            )}
                            onClick={() => setAccountTypeOpen(!accountTypeOpen)}
                          >
                            {accountTypeValue
                              ? accountTypes.find((accountType) => accountType.value === accountTypeValue)?.label
                              : "Select account type"}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-full p-0">
                        <Command>
                          <CommandInput placeholder="Search account type..." />
                          <CommandEmpty>No account type found.</CommandEmpty>
                          <CommandGroup>
                            {accountTypes.map((accountType) => (
                              <CommandItem
                                key={accountType.value}
                                value={accountType.value}
                                onSelect={(currentValue) => {
                                  setAccountTypeValue(currentValue === accountTypeValue ? "" : currentValue);
                                  setAccountTypeOpen(false);
                                  form.setValue("type", currentValue);
                                }}
                              >
                                <Check
                                  className={`mr-2 h-4 w-4 ${accountTypeValue === accountType.value ? "opacity-100" : "opacity-0"}`}
                                />
                                {accountType.label}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        </Command>
                      </PopoverContent>
                    </Popover>
                  ) : (
                    <>
                      <FormField
                        control={form.control}
                        name="customAccountName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Account Category Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter custom account category" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="customTypeName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Custom Account Category Type</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter custom account category type" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="space-y-2 mt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={disabled}
          >
            {!!id ? (
              <>
                <Save className="mr-2 size-2" /> Save changes
              </>
            ) : (
              <>
                <Plus className="mr-2 size-2" /> Create account
              </>
            )}
          </Button>
          <Button
            type="button"
            variant="destructive"
            disabled={disabled}
            className="w-full"
            onClick={() => (id ? handleDelete() : handleClear())}
          >
            {!!id ? (
              <>
                <Trash2 className="mr-2 size-2" /> Delete Account
              </>
            ) : (
              <>
                <RotateCcw className="mr-2 size-2" /> Clear fields
              </>
            )}
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
