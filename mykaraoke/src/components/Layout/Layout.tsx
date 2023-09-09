import { useQuery } from "@tanstack/react-query";
import AnimatedRoutes from "../AnimatedRoutes/AnimatedRoutes";
import Header from "../Header/Header";
import Page from "../Page/Page";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { Toaster } from "../ui/toaster";
import axios from "axios";
import { useContext, useState } from "react";
import GlobalContext from "@/context/GlobalContext";
import { useMeasure } from "@uidotdev/usehooks";

export default function Layout() {
  const globalContext = useContext(GlobalContext);
  const { isLoading, error, data } = useQuery({
    queryKey: ["userData"],
    // queryFn: () => fetch("http://54.200.165.61/").then((res) => res.json()),
    queryFn: () =>
      axios.get("http://localhost:3000/user").then((res) => {
        globalContext?.setUser(res.data);
        return res.data || null;
      }),
  });
  const [sidebarMenuMeasure, setSidebarMenuMeasure] = useState<any>(null);
  return (
    <div className={`relative flex flex-col min-h-screen`}>
      <Header />

      <div className={`flex items-stretch flex-1`}>
        <SidebarMenu
          expanded={false}
          setSideBarMenuMeasure={setSidebarMenuMeasure}
        />
        <div style={{ width: `${sidebarMenuMeasure}px` }}></div>
        <div className={`relative flex-1`}>
          <AnimatedRoutes />
        </div>
        <Toaster />
      </div>
    </div>
  );
}
