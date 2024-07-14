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
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Check, ChevronsUpDown, Plus, PlusIcon, Trash2Icon } from "lucide-react";

import { financialAccountCategories, financialAccountTypes } from "@/constants/financial-accounts-types";

type Props = {
  id: string,
  defaultValues: {
    name: string,
    category: string,
    type: string,
    customAccountName: string,
    customTypeName: string,
  },
  onSubmit: (values: z.infer<typeof financialAccountFormSchema>) => void,
  onDelete?: () => void,
  disabled?: boolean,
};

const financialAccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.string({ required_error: 'Please select an account category' }),
  type: z.string({ required_error: 'Please select an account type' }),
  customAccountName: z.string().optional(),
  customTypeName: z.string().optional(),
})

export const FinancialAccountForm = ({
  id,
  defaultValues,
  onDelete,
  disabled,
}: Props) => {
  const form = useForm<z.infer<typeof financialAccountFormSchema>>({
    resolver: zodResolver(financialAccountFormSchema),
    defaultValues: {
      name: "",
      category: "",
      type: "",
      customAccountName: "",
      customTypeName: "",
    },
  });

  // TODO: Put this in a separate constants file
  const handleDelete = () => {
    onDelete?.();
    console.log("Deleting account");
  };

  function onSubmit(values: z.infer<typeof financialAccountFormSchema>) {
    console.log(values)
  }

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState("");
  const [customAccountName, setCustomAccountName] = useState("");
  const [customAccountType, setCustomAccountType] = useState("");
  const [accountTypeValue, setAccountTypeValue] = useState("");

  // console.log(categoryValue);
  // console.log(customAccountName);
  // console.log(customAccountType);
  // console.log(accountTypeValue);

  const categories = Array.isArray(financialAccountCategories) ? financialAccountCategories : [];

  const accountTypes = financialAccountTypes[categoryValue] || [];

  // TODO: Upon choosing an item it doesn't automatically close the dropdown

  return (
    <FormProvider {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div>
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
          {/* Category Selection */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <Popover open={categoryOpen} onOpenChange={setCategoryOpen}>
                  <FormLabel>Account Category</FormLabel>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={categoryOpen}
                      className="w-full justify-between"
                      onClick={() => setCategoryOpen(!categoryOpen)}
                    >
                      {categoryValue
                        ? categories.find((category) => category.value === categoryValue)?.label
                        : "Select account category"}
                      <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
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
                              setCategoryValue(currentValue === categoryValue ? "" : currentValue);
                              setAccountTypeValue("");
                              setCategoryOpen(false);
                              // setCategoryValue('category', currentValue === categoryValue ? "" : currentValue);
                            }}
                          >
                            <Check
                              className={`mr-2 h-4 w-4 ${category.value === field.value ? "opacity-100" : "opacity-0"}`}
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
          {/* Account Type Selection */}
          {categoryValue && (
            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  {categoryValue !== "custom" && (

                    <Popover open={accountTypeOpen} onOpenChange={setAccountTypeOpen}>
                      <FormLabel>Account Type</FormLabel>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          role="combobox"
                          aria-expanded={accountTypeOpen}
                          className="w-full justify-between"
                          onClick={() => setAccountTypeOpen(!accountTypeOpen)}
                        >
                          {accountTypeValue
                            ? accountTypes.find((accountType) => accountType.value === accountTypeValue)?.label
                            : "Select account type"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
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
                                  // setValue('type', currentValue === accountTypeValue ? "" : currentValue);
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
                  )}
                  {categoryValue === "custom" && (
                    <>
                      <FormLabel>Custom Account Category Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter custom account category"
                          value={customAccountName}
                          onChange={(e) => setCustomAccountName(e.target.value)}
                          className="w-full"
                        />
                      </FormControl>
                      <FormLabel>Custom Account Category Type</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter custom account category type"
                          value={customAccountType}
                          onChange={(e) => setCustomAccountType(e.target.value)}
                          className="w-full"
                        />
                      </FormControl>
                    </>
                  )}
                  <FormMessage />
                </FormItem>
              )}
            />
          )}
        </div>
        <div className="space-y-2 mt-4">
          <Button type="submit" className="w-full">
            <Plus className="mr-2 size-2" />
            Create Account
          </Button>
          <Button type="button" variant="destructive" className="w-full">
            <Trash2Icon className="mr-2 size-2" />
            Delete Account
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
