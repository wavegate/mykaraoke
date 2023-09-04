import AnimatedRoutes from "../AnimatedRoutes/AnimatedRoutes";
import Header from "../Header/Header";
import Page from "../Page/Page";
import SidebarMenu from "../SidebarMenu/SidebarMenu";
import { Toaster } from "../ui/toaster";

export default function Layout() {
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
