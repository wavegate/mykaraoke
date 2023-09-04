import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import Layout from "./components/Layout/Layout";
const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
