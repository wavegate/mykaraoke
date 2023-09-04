import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import GlobalContext, { IUser } from "./context/GlobalContext";
import { useState } from "react";
const queryClient = new QueryClient();

export default function App() {
  const [user, setUser] = useState<IUser | null>(null);

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <GlobalContext.Provider value={{ user, setUser }}>
          <Layout />
        </GlobalContext.Provider>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
