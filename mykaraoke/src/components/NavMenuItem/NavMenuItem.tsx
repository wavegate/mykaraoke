import { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

interface INavMenuItem {
  icon: IconDefinition;
}

export default function NavMenuItem({ icon }: INavMenuItem) {
  return (
    <div
      className={`inline-flex p-1 rounded-md items-center gap-3
      hover:bg-slate-100 hover:font-medium hover:text-slate-800 hover:cursor-pointer transition-all duration-200 text-slate-600`}
    >
      <div className={`w-6 h-6 flex items-center justify-center`}>
        <FontAwesomeIcon icon={icon} />
      </div>
    </div>
  );
}
