type FinancialAccountTypes = {
  [key: string]: { label: string; value: string }[];
};

type FinancialAccountCategories = { label: string; value: string }[];

export const financialAccountCategories: FinancialAccountCategories = [
  { label: "Personal Financial Accounts", value: "personal" },
  { label: "Business Financial Accounts", value: "business" },
  { label: "Specialized Accounts", value: "specialized" },
  { label: "Digital and Alternative Financial Accounts", value: "digital" },
  { label: "Custom Account", value: "custom" }
];

export const financialAccountTypes: FinancialAccountTypes = {
  personal: [
    { label: "Checking", value: "checking" },
    { label: "Savings", value: "savings" },
    { label: "Money Market", value: "money_market" },
    { label: "Certificates of Deposit (CDs)", value: "cds" },
    { label: "Individual Retirement Accounts (IRAs)", value: "iras" },
    { label: "Brokerage", value: "brokerage" },
    { label: "Trust", value: "trust" }
  ],
  business: [
    { label: "Business Checking", value: "business_checking" },
    { label: "Business Savings", value: "business_savings" },
    { label: "Merchant", value: "merchant" },
    { label: "Payroll", value: "payroll" },
    { label: "Line of Credit", value: "line_of_credit" },
    { label: "Loan", value: "loan" }
  ],
  specialized: [
    { label: "Education Savings Accounts (ESAs)", value: "esas" },
    { label: "Health Savings Accounts (HSAs)", value: "hsas" },
    { label: "Flexible Spending Accounts (FSAs)", value: "fsas" }
  ],
  digital: [
    { label: "Online-Only Bank Accounts", value: "online_only" },
    { label: "Cryptocurrency Wallets", value: "crypto_wallets" }
  ],
  custom: []
};
