import { Minus, Plus } from "lucide-react";
import { useFieldArray } from "react-hook-form";
import { Button } from "./ui/button";

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
    <li key={item.id}>
      <input
        {...form.register(`experiences.${index}.companyName`, {
          required: true,
        })}
      />
      <input
        {...form.register(`experiences.${index}.location`, {
          required: true,
        })}
      />
      <input
        {...form.register(`experiences.${index}.title`, {
          required: true,
        })}
      />
      <input
        {...form.register(`experiences.${index}.date`, {
          required: true,
        })}
      />

      {fields.map((summaryItem, summaryIndex) => {
        return (
          <div key={summaryItem.id}>
            <input
              {...form.register(
                `experiences.${index}.summary.${summaryIndex}.value`,
                {
                  required: true,
                }
              )}
            />
            <button type="button" onClick={() => remove(summaryIndex)}>
              <Button className={`gap-[12px]`}>
                <div>Remove Bullet point</div>
                <Minus />
              </Button>
            </button>
          </div>
        );
      })}
      <button
        type="button"
        onClick={() => {
          append({
            value: "",
          });
        }}
      >
        <Button className={`gap-[12px]`}>
          <div>Add Bullet Point</div>
          <Plus />
        </Button>
      </button>

      <button type="button" onClick={() => removeExperiences(index)}>
        <Button className={`gap-[12px]`}>
          <div>Remove Experience</div>
          <Minus />
        </Button>
      </button>
    </li>
  );
}
