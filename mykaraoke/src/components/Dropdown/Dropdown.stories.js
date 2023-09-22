import { jsx as _jsx } from "react/jsx-runtime";
import Dropdown from "./Dropdown";
const meta = {
    title: "Dropdown",
    component: Dropdown,
    tags: ["autodocs"],
};
export default meta;
export const DropdownItem = {
    args: {
        trigger: (_jsx("div", { className: `resize border border-solid border-black overflow-auto`, children: "Hi" })),
        gap: 12,
        content: "Top content",
    },
};
