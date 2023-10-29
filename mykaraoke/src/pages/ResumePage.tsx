import AnimatedPage from "@/components/AnimatedPage/AnimatedPage";
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
  FormDescription,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { API_URL } from "@/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { BlobProvider, PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ChevronLeft, ChevronRight, Minus, Plus } from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { useToast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import ProjectField from "@/components/ProjectField";
import EducationField from "@/components/EducationField";
import { Tag, TagInput } from "@/components/TagInput";
import { parseISO } from "date-fns";
import InputMask from "react-input-mask";
import Spinner from "@/components/Spinner";
import MultipleComboBox from "@/components/MultipleComboBox";
import AnimatedPage2 from "@/components/AnimatedPage/AnimatedPage2";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import TailorForm from "@/components/TailorForm";
import { Switch } from "@/components/ui/switch";

function convertDatesToObject(obj) {
  for (const key in obj) {
    if (obj[key]) {
      if (typeof obj[key] === "string") {
        // Check if the string matches the ISO 8601 format
        const datePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/;
        if (datePattern.test(obj[key])) {
          obj[key] = parseISO(obj[key]);
        }
      } else if (typeof obj[key] === "object") {
        // Recursively traverse nested objects
        convertDatesToObject(obj[key]);
      }
    }
  }
}

const optionalString = (x) => {
  return x.nullish().transform((e) => (e === "" ? undefined : e));
};

const summarySchema = z.object({ value: z.string().max(1000) });

const dateSchema = z.object({
  from: z.date(),
  to: z.date(),
});

const experienceSchema = z.object({
  companyName: optionalString(z.string().max(100)),
  location: optionalString(z.string().max(100)),
  title: optionalString(z.string().max(100)),
  date: dateSchema,
  summary: z.array(summarySchema),
});

const educationSchema = z.object({
  schoolName: optionalString(z.string().max(100)),
  schoolLocation: optionalString(z.string().max(100)),
  degree: optionalString(z.string().max(100)),
  date: dateSchema,
  gpa: optionalString(z.string().max(5)),
  coursework: z.array(summarySchema).optional(),
});

const projectSchema = z.object({
  name: optionalString(z.string().max(100)),
  link: optionalString(z.string().max(100)),
  summary: z.array(summarySchema),
});

const formSchema = z.object({
  name: optionalString(z.string().max(100)),
  email: optionalString(z.string().max(100)),
  location: optionalString(z.string().max(100)),
  phone: optionalString(z.string().max(20)),
  githubLink: optionalString(z.string().max(100)),
  portfolioLink: optionalString(z.string().max(100).optional()),
  summary: z.array(summarySchema).optional(),
  skills: z.array(summarySchema).optional(),
  experiences: z.array(experienceSchema).optional(),
  education: z.array(educationSchema).optional(),
  projects: z.array(projectSchema).optional(),
});

export default function ResumePage() {
  const [tags, setTags] = useState<Tag[]>([]);
  const { toast } = useToast();

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
      location: "",
      phone: "",
      githubLink: "",
      portfolioLink: "",
      summary: [],
      skills: [],
      experiences: [],
    },
  });

  // const { data, isLoading } = useQuery({
  //   queryKey: ["resume"],
  //   queryFn: () =>
  //     axios.get(`${API_URL}/resume`).then((res) => {
  //       convertDatesToObject(res.data);
  //       form.reset(res.data);
  //       setTags(
  //         res.data.skills?.map((skill, index) => {
  //           return {
  //             id: index,
  //             text: skill.value,
  //           };
  //         })
  //       );
  //       return res?.data;
  //     }),
  //   refetchOnWindowFocus: false,
  // });
  const [showPreview, setShowPreview] = useState<boolean>(true);

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

  // useEffect(() => {
  //   console.log(debouncedData);
  // }, [debouncedData]);

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
    mutation.mutate(values as any);
  }

  function saveLocally() {
    localStorage.setItem("resume", JSON.stringify(watchAllFields));
    toast({
      title: "Resume saved!",
    });
  }

  function convertDateStringsToDate(obj: any): any {
    if (typeof obj === "string") {
      // Check if the string is a valid date
      const date = new Date(obj);
      if (!isNaN(date.getTime())) {
        return date;
      }
    } else if (Array.isArray(obj)) {
      // If it's an array, recursively convert date strings in each element
      return obj.map(convertDateStringsToDate);
    } else if (typeof obj === "object" && obj !== null) {
      // If it's an object, recursively convert date strings in its properties
      const newObj: { [key: string]: any } = {};
      for (const key in obj) {
        if (obj.hasOwnProperty(key)) {
          newObj[key] = convertDateStringsToDate(obj[key]);
        }
      }
      return newObj;
    }

    // Return other types as is
    return obj;
  }

  function loadFromLocal() {
    const localResume = JSON.parse(localStorage.getItem("resume"));
    const convertedResume = convertDateStringsToDate(localResume);
    setTags(
      convertedResume.skills.map((skill) => {
        return { id: skill.value, text: skill.value };
      })
    );
    form.reset(convertedResume);
    toast({
      title: "Resume loaded!",
    });
  }

  const docxMutation = useMutation({
    mutationFn: (convertResume) =>
      axios
        .post(`${API_URL}/convert`, convertResume, { responseType: "blob" })
        .then((res) => {
          const url = window.URL.createObjectURL(new Blob([res.data]));
          const link = document.createElement("a");
          link.href = url;
          link.setAttribute("download", "resume.docx");
          document.body.appendChild(link);
          link.click();
        }),
    onSuccess: () => {
      toast({
        title: "Resume converted!",
      });
    },
  });

  const handleDownloadDocx = (blob) => {
    const formData = new FormData();
    formData.append("blob", blob, "resume.pdf");
    docxMutation.mutate(formData as any);
  };

  const tagOptions = useMemo(() => {
    if (dataKeywords) {
      return dataKeywords.map((keyword) => {
        return { id: keyword.name, text: keyword.name };
      });
    }
  }, [dataKeywords]);

  const setTagsCallback = useCallback((newTags) => {
    setTags(newTags);
    form.setValue(
      `skills`,
      newTags.map((tag) => ({ value: tag.text }))
    );
  }, []);

  const saveOnline = () => {
    form.handleSubmit(onSubmit)();
  };

  const [hasExperience, setHasExperience] = useState<boolean>(false);

  function handleExperienceSwitch(checked) {
    setHasExperience(checked);
  }

  return (
    <AnimatedPage2>
      {debouncedData && dataKeywords ? (
        <div className={`flex`}>
          <div className={`grow`}>
            <div className={`flex justify-between p-4`}>
              <div className={`flex gap-2`}>
                {/* <Button
                  type="submit"
                  onClick={saveOnline}
                  loading={mutation.isLoading}
                >
                  Save Online
                </Button> */}
                <Button type="button" onClick={saveLocally}>
                  Save to Browser
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  onClick={loadFromLocal}
                >
                  Load from Browser
                </Button>
              </div>

              <div className={`flex gap-2 items-center`}>
                <Switch onCheckedChange={handleExperienceSwitch}></Switch>
                <TailorForm resumeForm={form} />
                <PDFDownloadLink
                  document={
                    <MyDocument
                      data={debouncedData}
                      dataKeywords={dataKeywords}
                      hasExperience={hasExperience}
                    />
                  }
                  fileName="resume.pdf"
                >
                  {({ blob, url, loading, error }) =>
                    loading ? (
                      "Loading document..."
                    ) : (
                      <Button type="button" variant="secondary">
                        Download .pdf
                      </Button>
                    )
                  }
                </PDFDownloadLink>

                <BlobProvider
                  document={
                    <MyDocument
                      data={debouncedData}
                      dataKeywords={dataKeywords}
                      hasExperience={hasExperience}
                    />
                  }
                >
                  {({ blob, url, loading, error }) => {
                    // Do whatever you need with blob here
                    return (
                      <Button
                        type="button"
                        variant="secondary"
                        loading={docxMutation.isLoading}
                        onClick={() => handleDownloadDocx(blob)}
                      >
                        Download .docx
                      </Button>
                    );
                  }}
                </BlobProvider>
              </div>
            </div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-[24px] h-[calc(100dvh-131px)] overflow-y-auto pl-4 pb-4 pr-4"
              >
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
                              <Input placeholder="eg. John Doe" {...field} />
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
                              <Input
                                placeholder="eg. johndoe@example.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Use a modern email client such as Gmail/Outlook,
                              NOT hotmail.
                            </FormDescription>
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
                              <InputMask
                                mask="(999) 999-9999"
                                value={field.value}
                                onChange={field.onChange}
                                onBlur={field.onBlur}
                              >
                                {(inputProps) => (
                                  <Input
                                    {...inputProps}
                                    type="tel"
                                    placeholder="eg. (255) 857-2255"
                                  />
                                )}
                              </InputMask>
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="eg. Cincinnati, OH"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Don't include your location (city/state) unless
                              the specific job you're applying for is in that
                              specific city.
                            </FormDescription>
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
                              <Input
                                placeholder="eg. github.com/bob"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              {" "}
                              Don't include full URLs for links.{" "}
                              <span className={`line-through`}>
                                https://www.
                              </span>
                              github.com/bob
                            </FormDescription>
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
                              <Input
                                placeholder="eg. portfolio.com"
                                {...field}
                              />
                            </FormControl>
                            <FormMessage />
                            <FormDescription>
                              Don't include full URLs for links.{" "}
                              <span className={`line-through`}>
                                https://www.
                              </span>
                              portfolio.com
                            </FormDescription>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
                {tagOptions && (
                  <Card>
                    <CardHeader className={`pb-3 text-[18px] font-semibold`}>
                      Skills
                    </CardHeader>
                    <CardContent>
                      {/* <MultipleComboBox form={form} keywords={dataKeywords} /> */}
                      <FormItem>
                        <FormControl>
                          <TagInput
                            enableAutocomplete
                            autocompleteOptions={tagOptions}
                            placeholder="eg. React.js"
                            tags={tags}
                            setTags={setTagsCallback}
                          />
                        </FormControl>
                        <FormDescription></FormDescription>
                        <FormMessage />
                      </FormItem>
                    </CardContent>
                  </Card>
                )}
                <Card>
                  <CardHeader>
                    <div
                      className={`flex gap-[12px] items-center justify-between`}
                    >
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
                    <FormDescription>
                      Don't include a summary or profile section unless you're a
                      senior/staff engineer or above, or are making a career
                      change.
                    </FormDescription>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <div
                      className={`flex gap-[12px] items-center justify-between`}
                    >
                      <div className={`text-[18px] font-semibold`}>
                        Experience
                      </div>
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
                            date: {
                              from: new Date(),
                              to: new Date(),
                            },
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
                    <div
                      className={`flex gap-[12px] items-center justify-between`}
                    >
                      <div className={`text-[18px] font-semibold`}>
                        Projects
                      </div>
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
                    <div
                      className={`flex gap-[12px] items-center justify-between`}
                    >
                      <div className={`text-[18px] font-semibold`}>
                        Education
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        type="button"
                        className={`gap-[6px]`}
                        onClick={() => {
                          appendEducation({
                            schoolName: "",
                            date: {
                              from: new Date(),
                              to: new Date(),
                            },
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
                    <FormDescription>
                      Don't include your high school.
                    </FormDescription>
                  </CardContent>
                </Card>
              </form>
            </Form>
          </div>
          <div className={`flex shrink-0 ${showPreview && `w-1/2`}`}>
            <div
              className={`h-full w-[20px] bg-slate-50 flex items-center justify-center cursor-pointer`}
              onClick={() => setShowPreview((prev) => !prev)}
            >
              {showPreview ? <ChevronRight /> : <ChevronLeft />}
            </div>
            {debouncedData && showPreview && (
              <PDFViewer className={`w-full h-[calc(100dvh-56px)]`}>
                <MyDocument
                  data={debouncedData}
                  dataKeywords={dataKeywords}
                  hasExperience={hasExperience}
                />
              </PDFViewer>
            )}
          </div>
        </div>
      ) : (
        <Spinner className={`w-full flex justify-center mt-[48px]`} />
      )}
    </AnimatedPage2>
  );
}
