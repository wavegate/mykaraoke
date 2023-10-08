import { Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import { FormControl, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ExperienceField({
  item,
  index,
  form,
  removeExperiences,
}) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `experiences.${index}.summary`,
    rules: {},
  });
  return (
    <div
      key={item.id}
      className={`shadow-sm rounded-md p-4 border border-solid`}
    >
      <div className={`flex flex-col gap-[24px]`}>
        <div className={`flex gap-[12px] items-center justify-between`}>
          <div className={`text-[18px] font-semibold`}>
            Experience {index + 1}
          </div>
          <div className={`gap-[12px] flex items-center`}>
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
            <Button
              variant="secondary"
              size="sm"
              type="button"
              className={`gap-[6px]`}
              onClick={() => {
                removeExperiences(index);
              }}
            >
              <Minus size={18} />
              <div>Remove Experience</div>
            </Button>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-[12px]`}>
          <FormItem>
            <FormLabel>Company Name</FormLabel>
            <FormControl>
              <Input
                placeholder="company name"
                {...form.register(`experiences.${index}.companyName`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Location</FormLabel>
            <FormControl>
              <Input
                placeholder="location"
                {...form.register(`experiences.${index}.location`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Title of Position</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. Web Developer"
                {...form.register(`experiences.${index}.title`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
          <FormItem>
            <FormLabel>Date</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. August 2022 - Present"
                {...form.register(`experiences.${index}.date`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        </div>
        {fields.map((item, innerIndex) => {
          return (
            <div className={`flex gap-[12px]`} key={item.id}>
              <div className={`flex-1`}>
                <Textarea
                  {...form.register(
                    `experiences.${index}.summary.${innerIndex}.value`,
                    {
                      required: true,
                    }
                  )}
                />
              </div>
              <Button
                variant="secondary"
                size="sm"
                type="button"
                className={`gap-[6px]`}
                onClick={() => {
                  remove(innerIndex);
                }}
              >
                <Minus size={18} />
                <div>Remove</div>
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
