import { useQuery } from "@tanstack/react-query";
import SidebarMenuItem from "@/components/SidebarMenuItem/SidebarMenuItem";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu";
import Title from "@/components/Title/Title";
import Header from "@/components/Header/Header";
import Page from "@/components/Page/Page";

export default function HomePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    // queryFn: () => fetch("http://54.200.165.61/").then((res) => res.json()),
    queryFn: () => fetch("http://localhost:3000/").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <div className={`relative flex flex-col min-h-screen`}>
      <Header />

      <div className={`flex flex-1`}>
        <SidebarMenu expanded={false} />
        <div className={`flex-1`}>
          <Page>
            {data.map((user) => {
              return <div>{user.email}</div>;
            })}
          </Page>
        </div>
      </div>
    </div>
  );
}
