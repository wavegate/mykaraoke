import SidebarMenuItem from "./SidebarMenuItem";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
const meta = {
    title: "SidebarMenuItem",
    component: SidebarMenuItem,
    tags: ["autodocs"],
};
export default meta;
export const Home = {
    args: {
        link: "/",
        label: "Home",
        icon: faHouse,
    },
};
