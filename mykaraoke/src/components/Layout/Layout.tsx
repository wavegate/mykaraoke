import { useQuery } from "@tanstack/react-query";
import AnimatedRoutes from "../AnimatedRoutes/AnimatedRoutes";
import Header from "../Header/Header";
import Page from "../Page/Page";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { Toaster } from "../ui/toaster";
import axios from "axios";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";

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
  return (
    <div className={`relative flex flex-col min-h-screen`}>
      <Header />

      <div className={`flex flex-1`}>
        <SidebarMenu expanded={false} />
        <div className={`flex-1`}>
          <Page>
            <AnimatedRoutes />
          </Page>
          <Toaster />
        </div>
      </div>
    </div>
  );
}
