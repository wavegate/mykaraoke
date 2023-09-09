import {
  faClipboardQuestion,
  faComments,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import "./index.scss";
import { useMeasure } from "@uidotdev/usehooks";
import { useEffect, useRef } from "react";

interface ISidebarMenu {
  expanded: boolean;
  setSideBarMenuMeasure: any;
}

export default function SidebarMenu({
  expanded,
  setSideBarMenuMeasure,
}: ISidebarMenu) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      for (const entry of entries) {
        if (ref.current) {
          const width = ref.current.getBoundingClientRect().width;
          setSideBarMenuMeasure(width);
        }
      }
    });
    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, setSideBarMenuMeasure]);
  return (
    <div
      className={`flex flex-col gap-1 max-w-xs p-2 shadow basis-56 overflow-x-hidden w-[240px] fixed h-full`}
      ref={ref}
    >
      <SidebarMenuItem link="/" label={"Dashboard"} icon={faHouse} />
      <SidebarMenuItem
        link="/mock"
        label={"Mock Interview"}
        icon={faClipboardQuestion}
      />
      <SidebarMenuItem link="/profile" label={"Profile"} icon={faUser} />
      <SidebarMenuItem
        link="/discussion"
        label={"Discussion"}
        icon={faComments}
      />
    </div>
  );
}
