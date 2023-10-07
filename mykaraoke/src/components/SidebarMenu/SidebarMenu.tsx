import {
  faClipboardQuestion,
  faComments,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import SidebarMenuItem from "../SidebarMenuItem/SidebarMenuItem";
import "./index.scss";
import { useEffect, useRef } from "react";

interface ISidebarMenu {
  expanded: boolean;
  setSideBarMenuMeasure: any;
}

export default function SidebarMenu({ setSideBarMenuMeasure }: ISidebarMenu) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      // for (const entry of entries) {
      if (ref.current) {
        const width = ref.current.getBoundingClientRect().width;
        setSideBarMenuMeasure(width);
      }
      // }
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
      className={`flex flex-col gap-1 max-w-xs p-2 shadow basis-56 overflow-x-hidden w-[240px] fixed h-full top-[56px]`}
      ref={ref}
    >
      <SidebarMenuItem link="/" label={"Dashboard"} icon={faHouse} />
      <SidebarMenuItem
        link="/resume"
        label={"Resume Generator"}
        icon={faClipboardQuestion}
      />
      <SidebarMenuItem
        link="/jobListings"
        label={"Job Listings"}
        icon={faClipboardQuestion}
      />
      {/* <SidebarMenuItem
        link="/mock"
        label={"Mock Interview"}
        icon={faClipboardQuestion}
      />
      <SidebarMenuItem link="/profile" label={"Profile"} icon={faUser} />
      <SidebarMenuItem
        link="/discussion"
        label={"Discussion"}
        icon={faComments}
      /> */}
    </div>
  );
}
