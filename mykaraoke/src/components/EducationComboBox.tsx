import { cx } from "class-variance-authority";
import { useCombobox, useMultipleSelection } from "downshift";
import { useState, useMemo } from "react";
import { Input } from "./ui/input";

export default function EducationComboBox({ form, keywords }) {
  const choices = keywords.map((keyword) => keyword.name);
  const initialSelectedItems = [
    ...form.getValues().skills.map((skill) => skill.value),
  ];

  function getFilteredBooks(selectedItems, inputValue) {
    const lowerCasedInputValue = inputValue.toLowerCase();

    return choices.filter(function filterBook(book) {
      return (
        !selectedItems.includes(book) &&
        book.toLowerCase().includes(lowerCasedInputValue)
      );
    });
  }

  function MultipleComboBox() {
    const [inputValue, setInputValue] = useState("");
    const [selectedItems, setSelectedItems] = useState(initialSelectedItems);
    const items = useMemo(
      () => getFilteredBooks(selectedItems, inputValue),
      [selectedItems, inputValue]
    );
    const { getSelectedItemProps, getDropdownProps, removeSelectedItem } =
      useMultipleSelection({
        selectedItems,
        onStateChange({ selectedItems: newSelectedItems, type }) {
          switch (type) {
            case useMultipleSelection.stateChangeTypes
              .SelectedItemKeyDownBackspace:
            case useMultipleSelection.stateChangeTypes
              .SelectedItemKeyDownDelete:
            case useMultipleSelection.stateChangeTypes.DropdownKeyDownBackspace:
            case useMultipleSelection.stateChangeTypes
              .FunctionRemoveSelectedItem:
              setSelectedItems(newSelectedItems);
              form.setValue(
                "skills",
                newSelectedItems.map((item) => {
                  return { value: item };
                })
              );
              break;
            default:
              break;
          }
        },
      });
    const {
      isOpen,
      getToggleButtonProps,
      getLabelProps,
      getMenuProps,
      getInputProps,
      highlightedIndex,
      getItemProps,
      selectedItem,
    } = useCombobox({
      items,
      itemToString(item) {
        return item ? item : "";
      },
      defaultHighlightedIndex: 0, // after selection, highlight the first item.
      selectedItem: null,
      inputValue,
      stateReducer(state, actionAndChanges) {
        const { changes, type } = actionAndChanges;

        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
            return {
              ...changes,
              isOpen: true, // keep the menu open after selection.
              highlightedIndex: 0, // with the first option highlighted.
            };
          default:
            return changes;
        }
      },
      onStateChange({
        inputValue: newInputValue,
        type,
        selectedItem: newSelectedItem,
      }) {
        switch (type) {
          case useCombobox.stateChangeTypes.InputKeyDownEnter:
          case useCombobox.stateChangeTypes.ItemClick:
          case useCombobox.stateChangeTypes.InputBlur:
            if (newSelectedItem) {
              setSelectedItems([...selectedItems, newSelectedItem]);
              form.setValue(
                "skills",
                [...selectedItems, newSelectedItem].map((item) => {
                  return { value: item };
                })
              );
              setInputValue("");
            }
            break;

          case useCombobox.stateChangeTypes.InputChange:
            setInputValue(newInputValue);

            break;
          default:
            break;
        }
      },
    });

    return (
      <div className="w-full">
        <div className="flex flex-col gap-1">
          {/* <label className="w-fit" {...getLabelProps()}>
            Skills:
          </label> */}
          <div className="bg-white inline-flex gap-2 items-center flex-wrap p-1.5">
            {selectedItems.map(
              function renderSelectedItem(selectedItemForRender, index) {
                return (
                  <span
                    className="bg-gray-100 rounded-md px-1 focus:bg-red-400"
                    key={`selected-item-${index}`}
                    {...getSelectedItemProps({
                      selectedItem: selectedItemForRender,
                      index,
                    })}
                  >
                    {selectedItemForRender}
                    <span
                      className="px-1 cursor-pointer"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeSelectedItem(selectedItemForRender);
                      }}
                    >
                      &#10005;
                    </span>
                  </span>
                );
              }
            )}
            <div className="flex gap-0.5 grow">
              <Input
                placeholder="Add skills"
                className="w-full"
                {...getInputProps(
                  getDropdownProps({ preventKeyAction: isOpen })
                )}
              />
              <button
                aria-label="toggle menu"
                className="px-2"
                type="button"
                {...getToggleButtonProps()}
              >
                &#8595;
              </button>
            </div>
          </div>
        </div>
        <ul
          className={`absolute w-inherit bg-white mt-1 shadow-md max-h-80 overflow-scroll p-0 z-10 ${
            !(isOpen && items.length) && "hidden"
          }`}
          {...getMenuProps()}
        >
          {isOpen &&
            items.map((item, index) => (
              <li
                className={cx(
                  highlightedIndex === index && "bg-blue-300",
                  selectedItem === item && "font-bold",
                  "py-2 px-3 shadow-sm flex flex-col"
                )}
                key={`${item}${index}`}
                {...getItemProps({ item, index })}
              >
                <span>{item}</span>
              </li>
            ))}
        </ul>
      </div>
    );
  }
  return <MultipleComboBox />;
}
