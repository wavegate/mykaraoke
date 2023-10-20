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
import { useState } from "react";
import { convertDatesToObject } from "@/pages/ResumePage";

const formSchema = z.object({
  jobDescription: z.string().min(1).max(10000),
});

export default function TailorForm({ resumeForm, setTags }: any) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      jobDescription: `
      In this Frontend Engineer role, you will develop and maintain many aspects of our product, will manage the Github repo and PR reviews, manage the release pipeline, and will assist and mentor other members of the team. This position will work closely with the backend for data contracts.
Responsibilities

Build and maintain React applications using TypeScript.
Develop and manage reusable React functional components.
Translate and implement designs into React code.
Take ownership of end-to-end feature delivery and post-launch support.
Lead software project development/maintenance efforts.
Contribute to architectural processes.
Research and integrate technological updates.
Demonstrate the ability to work remotely while effectively managing tasks.
Requirements

5+ years of experience in software engineering.
2+ years of experience with React or similar libraries/frameworks (e.g., Vue).
Proficiency in HTML, CSS, and JavaScript.
Proven expertise in TypeScript.
Proficient in state management systems, specifically Redux Toolkit.
Nice to have

Experience working with AWS or comparable cloud environments.
Familiarity with CI/CD pipelines such as Amplify and CodeBuild.
Experience with Styled Components or CSS in JS (or frameworks like Chakra/Material)
Experience with MJML or similar Email templating systems
Startup experience - Experience with scale
Experience working in a remote environment
      `,
    },
  });

  const mutation = useMutation({
    mutationFn: (updateResume) =>
      axios.post(`${API_URL}/resume/tailor`, updateResume),
    onSuccess: (data) => {
      convertDatesToObject(data?.data?.resume);
      setTags(
        data?.data?.resume?.skills.map((skill) => ({
          id: skill.value,
          text: skill.value,
        }))
      );
      resumeForm.reset(data?.data?.resume);
      setOpen(false);
    },
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

  const [open, setOpen] = useState<boolean>(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger onClick={() => setOpen(true)}>Tailor Resume</DialogTrigger>
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
            <Button
              onClick={form.handleSubmit(onSubmit)}
              loading={mutation.isLoading}
            >
              Tailor
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
