import { useQuery } from "@tanstack/react-query";
import SidebarMenuItem from "@/components/SidebarMenuItem/SidebarMenuItem";
import { faHouse } from "@fortawesome/free-solid-svg-icons";
import SidebarMenu from "@/components/SidebarMenu/SidebarMenu";
import Title from "@/components/Title/Title";
import Header from "@/components/Header/Header";
import Page from "@/components/Page/Page";
import { motion } from "framer-motion";

export default function HomePage() {
  const { isLoading, error, data } = useQuery({
    queryKey: ["repoData"],
    // queryFn: () => fetch("http://54.200.165.61/").then((res) => res.json()),
    queryFn: () => fetch("http://localhost:3000/").then((res) => res.json()),
  });

  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <motion.div
      className={`absolute`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {data.map((user, index) => {
        return <div key={index}>{user.email}</div>;
      })}
    </motion.div>
  );
}
