import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-solid-svg-icons";
import "./index.scss";

interface ISidebarMenuItem {
  active: boolean;
  label: string;
  icon: IconDefinition;
}

export default function SidebarMenuItem({
  active,
  label,
  icon,
}: ISidebarMenuItem) {
  return (
    <div
      className={`px-4 py-1.5 rounded-md flex items-center gap-3 ${
        active ? "bg-slate-100 font-medium text-slate-800" : "hover:bg-slate-50"
      } hover:cursor-pointer transition-all duration-200 text-slate-600 hover:text-slate-800 group`}
    >
      <div className={`w-6 h-6 flex items-center justify-center`}>
        <FontAwesomeIcon
          icon={icon}
        />
      </div>
      <div>{label}</div>
    </div>
  );
}
