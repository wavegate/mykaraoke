import { faComments, faHouse, faUser } from "@fortawesome/free-solid-svg-icons";
import SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import "./index.scss";

interface ISidebarMenu {
  expanded: boolean;
}

export default function SidebarMenu({ expanded }: ISidebarMenu) {
  return (
    <div className={`flex flex-col gap-1 max-w-xs p-2 shadow basis-56`}>
      <SidebarMenuItem
        link="/"
        active={true}
        label={"Dashboard"}
        icon={faHouse}
      />
      <SidebarMenuItem
        link="/profile"
        active={false}
        label={"Profile"}
        icon={faUser}
      />
      <SidebarMenuItem
        link="/discussion"
        active={false}
        label={"Discussion"}
        icon={faComments}
      />
    </div>
  );
}
