import { Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";
import {
  FormControl,
  FormDescription,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";

export default function ProjectField({ item, index, form, removeProjects }) {
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `projects.${index}.summary`,
    rules: {},
  });
  return (
    <div
      key={item.id}
      className={`shadow-sm rounded-md p-4 border border-solid`}
    >
      <div className={`flex flex-col gap-[24px]`}>
        <div className={`flex gap-[12px] items-center justify-between`}>
          <div className={`text-[18px] font-semibold`}>Project {index + 1}</div>
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
              <div>Add Bullet Point</div>
            </Button>
            <Button
              variant="secondary"
              size="sm"
              type="button"
              className={`gap-[6px]`}
              onClick={() => {
                removeProjects(index);
              }}
            >
              <Minus size={18} />
              <div>Remove Project</div>
            </Button>
          </div>
        </div>
        <div className={`grid grid-cols-2 gap-[12px]`}>
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. Todo List"
                {...form.register(`projects.${index}.name`, {
                  required: true,
                })}
              />
            </FormControl>
            <FormMessage />
            <FormDescription>
              Do not use the word "project" in your project names: it's
              redundant. There is no need to disclose "Personal Project",
              "Academic Project", "Group Project" beside your project title.
              There is no need to distinguish between project types.
            </FormDescription>
          </FormItem>
          <FormItem>
            <FormLabel>Link to Project</FormLabel>
            <FormControl>
              <Input
                placeholder="eg. github.com/user/project"
                {...form.register(`projects.${index}.link`, {
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
                    `projects.${index}.summary.${innerIndex}.value`,
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
        <FormDescription>
          Order your projects and bullet points by relevance to the job OR
          impressiveness. Put your best stuff first!
        </FormDescription>
      </div>
    </div>
  );
}
