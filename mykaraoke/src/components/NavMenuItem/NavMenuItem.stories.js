import NavMenuItem from "./NavMenuItem";
import { faHouse, faMoon } from "@fortawesome/free-solid-svg-icons";
const meta = {
    title: "NavMenuItem",
    component: NavMenuItem,
    tags: ["autodocs"],
};
export default meta;
export const NavMenuItemItem = {
    args: {
        icon: faHouse,
    },
};
export const MoonNavMenuItem = {
    args: {
        icon: faMoon,
    },
};
