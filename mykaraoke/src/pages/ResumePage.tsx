import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import MultipleComboBoxExample from "@/components/ComboBoxExample";
import ExperienceField from "@/components/ExperienceField";
import MyDocument from "@/components/MyDocument";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Minus, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";

const summarySchema = z.object({ value: z.string().min(1).max(1000) });

const experienceSchema = z.object({
  companyName: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  date: z.string().min(1).max(100),
  summary: z.array(summarySchema),
});

const educationSchema = z.object({
  schoolName: z.string().min(1).max(100),
  schoolLocation: z.string().min(1).max(100),
  degree: z.string().min(1).max(100),
  date: z.string().min(1).max(100),
  relevantCoursework: z.array(summarySchema),
});

const projectSchema = z.object({
  name: z.string().min(1).max(100),
  link: z.string().min(1).max(100),
  summary: z.array(summarySchema),
});

const formSchema = z.object({
  name: z.string().min(1).max(100),
  email: z.string().min(1).max(100),
  phone: z.string().min(1).max(20),
  githubLink: z.string().min(1).max(100).optional(),
  portfolioLink: z.string().min(1).max(100).optional(),
  summary: z.array(summarySchema),
  skills: z.array(summarySchema),
  experiences: z.array(experienceSchema),
  // education: z.array(educationSchema),
  // projects: z.array(projectSchema),
});

export default function ResumePage() {
  const { toast } = useToast();
  const { data, isLoading } = useQuery({
    queryKey: ["resume"],
    queryFn: () =>
      axios.get(`${API_URL}/resume`).then((res) => {
        return res?.data;
      }),
    refetchOnWindowFocus: false,
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      githubLink: "",
      portfolioLink: "",
      summary: [
        {
          value:
            "Highly-skilled web developer with a strong background in building scalable web applications.",
        },
        {
          value: "Expertise in JavaScript, React.js, and frontend development.",
        },
        {
          value:
            "Seeking to leverage my technical and communication skills to create and optimize impactful web solutions.",
        },
      ],
      skills: [
        { value: "JavaScript" },
        { value: "TypeScript" },
        { value: "Docker" },
        { value: "Python" },
        { value: "AWS" },
      ],
      experiences: [
        {
          companyName: "ABC Tech Solutions",
          location: "Plainsboro Township, NJ, USA",
          title: "Web Developer",
          date: "January 2023 - Present",
          summary: [
            {
              value:
                "Developed and maintained web applications using React.js, Node.js, and TypeScript resulting in a 50% increase in application performance.",
            },
            {
              value:
                "Collaborated with UI/UX designers ensuring seamless implementation and optimized user experience.",
            },
            {
              value:
                "Conducted code reviews to maintain coding standards and implemented CI/CD pipelines using AWS.",
            },
            {
              value:
                "Utilized agile methodologies for iterative development and efficient delivery.",
            },
          ],
        },
      ],
    },
  });

  useEffect(() => {
    if (data) {
      form.reset(data);
    }
  }, [form, data]);

  const watchAllFields = form.watch();

  const [debouncedData, setDebouncedData] = useState(watchAllFields);

  const [timerIdState, setTimerIdState] = useState<any>(0);

  useEffect(() => {
    clearTimeout(timerIdState);

    const timerId = setTimeout(() => {
      setDebouncedData(watchAllFields);
    }, 1000);
    setTimerIdState(timerId);
  }, [JSON.stringify(watchAllFields)]);

  const mutation = useMutation({
    mutationFn: (updateResume) => axios.post(`${API_URL}/resume`, updateResume),
    onSettled: () => {
      toast({
        title: "Resume saved!",
      });
    },
  });

  const { fields, append, prepend, remove, swap, move, insert, replace } =
    useFieldArray({
      control: form.control,
      name: "summary",
      rules: {},
    });

  const {
    fields: fieldsExperiences,
    append: appendExperiences,
    remove: removeExperiences,
  } = useFieldArray({
    control: form.control,
    name: "experiences",
    rules: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    mutation.mutate(values as any);
  }
  return (
    <AnimatedPage>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="name" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="email" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone</FormLabel>
                <FormControl>
                  <Input placeholder="phone" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="githubLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>GitHub Link</FormLabel>
                <FormControl>
                  <Input placeholder="githubLink" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="portfolioLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Portfolio Link</FormLabel>
                <FormControl>
                  <Input placeholder="portfolioLink" {...field} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <MultipleComboBoxExample form={form} />
          {fields.map((item, index) => {
            return (
              <li key={item.id}>
                <input
                  {...form.register(`summary.${index}.value`, {
                    required: true,
                  })}
                />

                <Button type="button" onClick={() => remove(index)}>
                  <Minus />
                </Button>
              </li>
            );
          })}
          <Button
            type="button"
            onClick={() => {
              append({ value: "" });
            }}
          >
            <Plus />
          </Button>
          {fieldsExperiences.map((item, index) => {
            return (
              <ExperienceField
                form={form}
                item={item}
                index={index}
                key={index}
                removeExperiences={removeExperiences}
              />
            );
          })}
          <Button
            type="button"
            onClick={() => {
              appendExperiences({
                companyName: "",
                location: "",
                title: "",
                date: "",
              });
            }}
          >
            <div>Add Experience</div>
            <Plus />
          </Button>
          <Button type="submit">Submit</Button>
        </form>
      </Form>
      <div className={`w-full`}>
        {debouncedData && (
          <>
            <PDFViewer className={`w-full h-[100dvh]`}>
              <MyDocument data={debouncedData} />
            </PDFViewer>

            <PDFDownloadLink
              document={<MyDocument data={debouncedData} />}
              fileName="somename.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? "Loading document..." : "Download now!"
              }
            </PDFDownloadLink>
          </>
        )}
      </div>
    </AnimatedPage>
  );
}
