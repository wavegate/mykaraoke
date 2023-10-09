import { CalendarIcon, Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { TagInput, Tag } from "./TagInput";
import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { Calendar } from "./ui/calendar";

export default function EducationField({ item, index, form, removeEducation }) {
  const [tags, setTags] = useState<Tag[]>([]);
  return (
    <div
      key={item.id}
      className={`shadow-sm rounded-md p-4 border border-solid`}
    >
      <div className={`flex flex-col gap-[24px]`}>
        <div className={`flex gap-[12px] items-center justify-between`}>
          <div className={`text-[18px] font-semibold`}>
            Education {index + 1}
          </div>
          <div className={`gap-[12px] flex items-center`}>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              className={`gap-[6px]`}
              onClick={() => {
                removeEducation(index);
              }}
            >
              <Minus size={18} />
              <div>Remove Education</div>
            </Button>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-[12px]`}>
          <FormItem>
            <FormLabel>School Name</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. San Jose State University"
                {...form.register(`education.${index}.schoolName`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>School Location</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. Middlesex County, New Jersey"
                {...form.register(`education.${index}.schoolLocation`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Don't include your school location if your school has the location
              in its name i.e. MIT or UCLA or if its location is commonly known.
            </FormDescription>
          </FormItem>
          <FormItem>
            <FormLabel>Degree</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. Bachelor of Science"
                {...form.register(`education.${index}.degree`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              On your resume, it's Bachelor
              <span className={`line-through`}> 's</span> of Science and Master
              <span className={`line-through`}> 's</span> of Science.
            </FormDescription>
          </FormItem>
          <FormField
            control={form.control}
            name={`education.${index}.date`}
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date of birth</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[300px] justify-start text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {field.value?.from ? (
                            field.value.to ? (
                              <>
                                {format(field.value.from, "LLL dd, y")} -{" "}
                                {format(field.value.to, "LLL dd, y")}
                              </>
                            ) : (
                              format(field.value.from, "LLL dd, y")
                            )
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        mode="range"
                        defaultMonth={field?.value.from}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </FormControl>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. August 2012 - December 2015"
                {...form.register(`education.${index}.date`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>GPA</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. 3.75"
                {...form.register(`education.${index}.gpa`, {
                  required: false,
                })}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Generally if your GPA is above 3.5, put it on your resume. After a
              few years, and your education section is all the way at the bottom
              of your resume, remove your GPA unless it's very impressive.
            </FormDescription>
          </FormItem>

          <FormItem className={`col-span-2`}>
            <FormLabel>Relevant Coursework</FormLabel>
            <FormControl>
              <TagInput
                placeholder="eg. Quantum Computing"
                tags={tags}
                setTags={(newTags) => {
                  setTags(newTags);
                  form.setValue(
                    `education.${index}.coursework`,
                    newTags.map((tag) => ({ value: tag.text })) as [
                      Tag,
                      ...Tag[],
                    ]
                  );
                }}
              />
            </FormControl>
            <FormDescription>
              Don't include coursework unless they are very specialized such as
              graduate electives or really cool like underwater robotics.
            </FormDescription>
            <FormMessage />
          </FormItem>
        </div>
      </div>
    </div>
  );
}
