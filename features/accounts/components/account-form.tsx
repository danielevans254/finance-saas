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
import { Check, ChevronsUpDown, Plus, RotateCcw } from "lucide-react";

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
  disabled?: boolean,
};

const financialAccountFormSchema = z.object({
  name: z.string().min(2).max(50),
  category: z.string().min(2, { message: "Please enter an account category" }).max(50),
  type: z.string().optional(),
  customAccountName: z.string().optional(),
  customTypeName: z.string().optional(),
}).superRefine((data, ctx) => {
  if (data.category !== 'custom' && !data.type) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: 'Type is required if category is not "custom"',
      path: ['type'],
    });
  }

  if (data.category === 'custom') {
    if (!data.customAccountName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Custom account name is required if category is "custom"',
        path: ['customAccountName'],
      });
    }
    if (!data.customTypeName) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'Custom type name is required if category is "custom"',
        path: ['customTypeName'],
      });
    }
  }
});

export const FinancialAccountForm = ({
  id,
  defaultValues,
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

  const [categoryOpen, setCategoryOpen] = useState(false);
  const [categoryValue, setCategoryValue] = useState('');
  const [accountTypeOpen, setAccountTypeOpen] = useState(false);
  const [accountTypeValue, setAccountTypeValue] = useState('');
  const [customAccountName, setCustomAccountName] = useState('');
  const [customAccountType, setCustomAccountType] = useState('');

  const categories = Array.isArray(financialAccountCategories) ? financialAccountCategories : [];

  const accountTypes = financialAccountTypes[categoryValue] || [];

  const handleCategoryChange = (value: string) => {
    form.setValue('category', value);
    setCategoryValue(value);
    setAccountTypeValue('');
    if (value === 'custom') {
      form.setValue('type', '');
    }
  };

  // TODO: Put this in a separate constants file
  const handleClear = () => {
    form.reset();
    setCategoryValue('');
    setAccountTypeValue('');
    setCustomAccountName('');
    setCustomAccountType('');
  };

  const handleSubmit = (values: z.infer<typeof financialAccountFormSchema>) => {
    console.log(values);
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
          <Button type="submit" className="w-full">
            <Plus className="mr-2 size-2" />
            Create Account
          </Button>
          <Button type="button" variant="destructive" className="w-full" onClick={handleClear}>
            <RotateCcw className="mr-2 size-2" />
            Clear Fields
          </Button>
        </div>
      </form>
    </FormProvider>
  );
};
