import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { API_URL } from "@/constants";
import { toast } from "./ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Textarea } from "./ui/textarea";
import { Button } from "./ui/button";

const formSchema = z.object({
  jobDescription: z.string().min(1).max(10000),
});

export default function TailorForm({ resumeForm }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (updateResume) =>
      axios.post(`${API_URL}/resume/tailor`, updateResume),
    onSettled: () => {
      toast({
        title: "Resume tailored!",
      });
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate({
      jobDescription: values.jobDescription,
      resume: resumeForm.getValues(),
    } as any);
  }

  return (
    <Dialog>
      <DialogTrigger>Tailor Resume</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tailor your Resume</DialogTitle>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="jobDescription"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Job Description</FormLabel>
                    <FormControl>
                      <Textarea {...field} />
                    </FormControl>
                    <FormMessage />
                    <FormDescription>
                      Copy and paste the job description you want to tailor your
                      resume to here. NOTE: Save your resume before clicking
                      "Tailor"! Tailoring your resume WILL OVERWRITE your
                      current resume.
                    </FormDescription>
                  </FormItem>
                )}
              />
            </form>
          </Form>

          <DialogDescription></DialogDescription>
          <DialogFooter>
            <Button onClick={form.handleSubmit(onSubmit)}>Tailor</Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
