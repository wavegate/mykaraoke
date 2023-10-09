import HomePage from "@/pages/HomePage";
import JobListingPage from "@/pages/JobListingPage";
import LoginPage from "@/pages/LoginPage";
import MockPage from "@/pages/MockPage/MockPage";
import RegisterPage from "@/pages/RegisterPage";
import ResumePage from "@/pages/ResumePage";
import RolesPage from "@/pages/RolesPage/RolesPage";
import { AnimatePresence } from "framer-motion";
import { Route, Routes, useLocation } from "react-router-dom";

export default function AnimatedRoutes() {
	const location = useLocation();

	return (
		<AnimatePresence>
			<Routes location={location} key={location.pathname}>
				<Route path="/" element={<HomePage />}></Route>
				<Route path="/mock" element={<MockPage />}></Route>
				<Route path="/login" element={<LoginPage />}></Route>
				<Route path="/register" element={<RegisterPage />}></Route>
				<Route path="/resume" element={<ResumePage />}></Route>
				<Route path="/jobListings" element={<JobListingPage />}></Route>
				<Route path="/roles" element={<RolesPage />}></Route>
			</Routes>
		</AnimatePresence>
	);
}
