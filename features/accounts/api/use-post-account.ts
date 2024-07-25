import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";
import { client } from "@/lib/hono";
import toast from 'react-hot-toast';

// FIXME: Fix requesttype type inference

type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post["json"]>;

// TODO: Add a check for if the name already exists, and ask if the user will add another account with the same name, create zustand modal for this

export const usePostAccount = () => {
  const queryClient = useQueryClient();
  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (json) => {
      const res = await client.api.accounts.$post({ json });
      return res.json();
    },
    onSuccess: () => {
      toast.success("Account created successfully");
      queryClient.invalidateQueries({ queryKey: ["accounts"] });
    },
    onError: (error) => {
      toast.error("Failed to create account");
      console.error(error);
    },
  })
  return mutation;
};