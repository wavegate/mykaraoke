import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
import MultipleComboBoxExample from "@/components/ComboBoxExample";
import ExperienceField from "@/components/ExperienceField";
import MyDocument from "@/components/MyDocument";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
import { Textarea } from "@/components/ui/textarea";
import ProjectField from "@/components/ProjectField";
import EducationField from "@/components/EducationField";

const summarySchema = z.object({ value: z.string().min(1).max(1000) });

const experienceSchema = z.object({
  companyName: z.string().min(1).max(100),
  location: z.string().min(1).max(100),
  title: z.string().min(1).max(100),
  date: z.string().min(1).max(100),
  summary: z.array(summarySchema),
});

const dateSchema = z.object({
  from: z.date(),
  to: z.date(),
});

const educationSchema = z.object({
  schoolName: z.string().min(1).max(100),
  schoolLocation: z.string().min(1).max(100),
  degree: z.string().min(1).max(100),
  date: dateSchema,
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
  education: z.array(educationSchema),
  projects: z.array(projectSchema),
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

  const { data: dataKeywords, isLoading: isLoadingKeywords } = useQuery({
    queryKey: ["keywords"],
    queryFn: () =>
      axios.get(`${API_URL}/keywords`).then((res) => {
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

  useEffect(() => {
    console.log(debouncedData);
  }, [debouncedData]);

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

  const {
    fields: fieldsProjects,
    append: appendProjects,
    remove: removeProjects,
  } = useFieldArray({
    control: form.control,
    name: "projects",
    rules: {},
  });

  const {
    fields: fieldsEducation,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control: form.control,
    name: "education",
    rules: {},
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log("hi");
    mutation.mutate(values as any);
  }
  return (
    <AnimatedPage>
      <div className={`grid grid-cols-2 gap-[24px]`}>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Card>
              <CardHeader className={`pb-3 text-[18px] font-semibold`}>
                Contact Information
              </CardHeader>
              <CardContent>
                <div className={`grid grid-cols-2 gap-[12px]`}>
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
                </div>
              </CardContent>
            </Card>
            {dataKeywords && (
              <Card>
                <CardHeader className={`pb-3 text-[18px] font-semibold`}>
                  Skills
                </CardHeader>
                <CardContent>
                  <MultipleComboBoxExample
                    form={form}
                    keywords={dataKeywords}
                  />
                </CardContent>
              </Card>
            )}
            <Card>
              <CardHeader>
                <div className={`flex gap-[12px] items-center justify-between`}>
                  <div className={`text-[18px] font-semibold`}>Summary</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    className={`gap-[6px]`}
                    onClick={() => {
                      append({ value: "" });
                    }}
                  >
                    <Plus size={18} />
                    <div>Add Summary Bullet Point</div>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`flex flex-col gap-[12px]`}>
                {fields.map((item, index) => {
                  return (
                    <div className={`flex gap-[12px]`} key={item.id}>
                      <div className={`flex-1`}>
                        <Textarea
                          {...form.register(`summary.${index}.value`, {
                            required: true,
                          })}
                        />
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        className={`gap-[6px]`}
                        onClick={() => {
                          remove(index);
                        }}
                      >
                        <Minus size={18} />
                        <div>Remove</div>
                      </Button>
                    </div>
                  );
                })}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className={`flex gap-[12px] items-center justify-between`}>
                  <div className={`text-[18px] font-semibold`}>Experience</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    className={`gap-[6px]`}
                    onClick={() => {
                      appendExperiences({
                        companyName: "",
                        location: "",
                        title: "",
                        date: "",
                      });
                    }}
                  >
                    <Plus size={18} />
                    <div>Add Experience</div>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`flex flex-col gap-[24px]`}>
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
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className={`flex gap-[12px] items-center justify-between`}>
                  <div className={`text-[18px] font-semibold`}>Projects</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    className={`gap-[6px]`}
                    onClick={() => {
                      appendProjects({
                        name: "",
                        link: "",
                      });
                    }}
                  >
                    <Plus size={18} />
                    <div>Add Project</div>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`flex flex-col gap-[24px]`}>
                {fieldsProjects.map((item, index) => {
                  return (
                    <ProjectField
                      form={form}
                      item={item}
                      index={index}
                      key={index}
                      removeProjects={removeProjects}
                    />
                  );
                })}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <div className={`flex gap-[12px] items-center justify-between`}>
                  <div className={`text-[18px] font-semibold`}>Education</div>
                  <Button
                    variant="secondary"
                    size="sm"
                    type="button"
                    className={`gap-[6px]`}
                    onClick={() => {
                      appendEducation({
                        schoolName: "",
                        schoolLocation: "",
                        date: {
                          from: new Date(),
                          to: new Date(),
                        },
                        degree: "",
                      });
                    }}
                  >
                    <Plus size={18} />
                    <div>Add Education</div>
                  </Button>
                </div>
              </CardHeader>
              <CardContent className={`flex flex-col gap-[24px]`}>
                {fieldsEducation.map((item, index) => {
                  return (
                    <EducationField
                      form={form}
                      item={item}
                      index={index}
                      key={index}
                      removeEducation={removeEducation}
                    />
                  );
                })}
              </CardContent>
            </Card>

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
      </div>
    </AnimatedPage>
  );
}
