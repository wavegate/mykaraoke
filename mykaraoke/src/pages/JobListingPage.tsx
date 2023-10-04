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
import { DataTable } from "./DataTable";
import { API_URL } from "@/constants";
import { jobListingColumns } from "./JobListingColumns";

// const formSchema = z.object({
//   title: z.string().min(2).max(50),
//   link: z.string().min(2).max(50),
//   description: z.string().min(2).max(255),
// });

export default function JobListingPage() {
  const { data } = useQuery({
    queryKey: ["jobListings"],
    queryFn: () =>
      axios.get(`${API_URL}/jobListings`).then((res) => {
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
      {data && <DataTable columns={jobListingColumns} data={data} />}
    </AnimatedPage>
  );
}
