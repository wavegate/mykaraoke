import { Minus } from "lucide-react";
import { useFieldArray } from "react-hook-form";

export default function ProjectField({ item, index, form, removeExperiences }) {
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
              <Minus />
            </button>
          </div>
        );
      })}

      <button type="button" onClick={() => removeExperiences(index)}>
        <Minus />
      </button>
    </li>
  );
}
