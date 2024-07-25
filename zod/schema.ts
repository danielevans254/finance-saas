import { z } from "zod";

export const financialAccountFormSchema = z.object({
  name: z.string().min(1, { message: "Please enter an account name" }).max(50, { message: "Account name is too long" }),
  category: z.string().min(1, { message: "Please enter an account category" }).max(50),
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
