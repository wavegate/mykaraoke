import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import { DataTable } from "../DataTable";
import { columns } from "./columns";
import { API_URL } from "@/constants";

const formSchema = z.object({
  question: z.string().min(2).max(255),
  answer: z.string().min(2),
});

export default function MockPage() {
  const { data } = useQuery({
    queryKey: ["questions"],
    // queryFn: () => fetch("http://54.200.165.61/").then((res) => res.json()),
    queryFn: () =>
      axios.get(`${API_URL}/questions`).then((res) => {
        return res?.data;
      }),
  });

  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      question: "",
      answer: "",
    },
  });

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newQuestion) =>
      axios.post(`${API_URL}/questions`, newQuestion),
    // When mutate is called:
    onMutate: async (newQuestion) => {
      // Cancel any outgoing refetches
      // (so they don't overwrite our optimistic update)
      await queryClient.cancelQueries({ queryKey: ["questions"] });

      // Snapshot the previous value
      const previousQuestions = queryClient.getQueryData(["questions"]);

      // Optimistically update to the new value
      queryClient.setQueryData(["questions"], (old: any) => [
        ...old,
        newQuestion,
      ]);

      // Return a context object with the snapshotted value
      return { previousQuestions };
    },
    // If the mutation fails,
    // use the context returned from onMutate to roll back
    onError: (err: any, _, context) => {
      queryClient.setQueryData(["questions"], context?.previousQuestions);
      toast({
        variant: "destructive",
        title: "Failed to create question!",
        description: err.response?.data.message,
      });
    },
    // Always refetch after error or success:
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["questions"] });
      toast({
        title: "Question created successfully!",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values as any);
  }

  return (
    <AnimatedPage>
      {data && <DataTable columns={columns} data={data} />}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="question"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Question</FormLabel>
                <FormControl>
                  <Input placeholder="question" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="answer"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Answer</FormLabel>
                <FormControl>
                  <Input placeholder="answer" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit">Submit</Button>
        </form>
      </Form>
    </AnimatedPage>
  );
}
