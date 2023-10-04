import { useQuery } from "@tanstack/react-query";
import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
// import { useToast } from "@/components/ui/use-toast";
// import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
// import { z } from "zod";
// import {
//   Form,
//   FormField,
//   FormItem,
//   FormLabel,
//   FormControl,
//   FormMessage,
// } from "@/components/ui/form";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useForm } from "react-hook-form";
import { columns } from "./columns";
import { DataTable } from "./DataTable";
import { API_URL } from "@/constants";
import BarChart from "@/components/BarChart/BarChart";
import ChloropethChart from "@/components/ChloropethChart/ChloropethChart";

// const formSchema = z.object({
//   title: z.string().min(2).max(50),
//   link: z.string().min(2).max(50),
//   description: z.string().min(2).max(255),
// });

export default function HomePage() {
  const { data } = useQuery({
    queryKey: ["keywords"],
    queryFn: () =>
      axios.get(`${API_URL}/keywords`).then((res) => {
        return res?.data;
      }),
    refetchOnWindowFocus: false,
  });

  // const { toast } = useToast();

  // const form = useForm<z.infer<typeof formSchema>>({
  //   resolver: zodResolver(formSchema),
  //   defaultValues: {
  //     title: "",
  //     link: "",
  //     description: "",
  //   },
  // });

  // const queryClient = useQueryClient();

  // const mutation = useMutation({
  //   mutationFn: (newJob) => axios.post(`${API_URL}job`, newJob),
  //   // When mutate is called:
  //   onMutate: async (newJob) => {
  //     // Cancel any outgoing refetches
  //     // (so they don't overwrite our optimistic update)
  //     await queryClient.cancelQueries({ queryKey: ["jobs"] });

  //     // Snapshot the previous value
  //     const previousJobs = queryClient.getQueryData(["jobs"]);

  //     // Optimistically update to the new value
  //     queryClient.setQueryData(["jobs"], (old: any) => [...old, newJob]);

  //     // Return a context object with the snapshotted value
  //     return { previousJobs };
  //   },
  //   // If the mutation fails,
  //   // use the context returned from onMutate to roll back
  //   onError: (err: any, _, context) => {
  //     queryClient.setQueryData(["jobs"], context?.previousJobs);
  //     toast({
  //       variant: "destructive",
  //       title: "Failed to create job!",
  //       description: err.response?.data.message,
  //     });
  //   },
  //   // Always refetch after error or success:
  //   onSettled: () => {
  //     queryClient.invalidateQueries({ queryKey: ["jobs"] });
  //     toast({
  //       title: "Job created successfully!",
  //     });
  //   },
  // });

  // function onSubmit(values: z.infer<typeof formSchema>) {
  //   mutation.mutate(values as any);
  // }

  return (
    <AnimatedPage>
      {data && <DataTable columns={columns} data={data} />}
      {data && <ChloropethChart data={data} category="Programming Language" />}
      <div className={`grid grid-cols-2`}>
        {data && <BarChart data={data} category="Programming Language" />}
        {data && <BarChart data={data} category="General Skill" />}
        {data && <BarChart data={data} category="Personality Trait" />}
        {data && <BarChart data={data} category="Framework" />}
        {data && <BarChart data={data} category="Engineering Process" />}
        {data && <BarChart data={data} category="Engineering Practice" />}
        {data && <BarChart data={data} category="Cloud" />}
        {data && <BarChart data={data} category="DevOps" />}
        {data && <BarChart data={data} category="Tool" />}
      </div>

      {/* <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="title" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="link"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Link</FormLabel>
                <FormControl>
                  <Input placeholder="link" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="description" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Submit</Button>
        </form>
      </Form> */}
    </AnimatedPage>
  );
}
