import { faMoon } from "@fortawesome/free-solid-svg-icons";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import Subtitle from "../Subtitle/Subtitle";
import Title from "../Title/Title";
import "./index.scss";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";
import { Link } from "react-router-dom";
import { useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";

interface IHeader {}

export default function Header({}: IHeader) {
  const globalContext = useContext(GlobalContext);
  const user = globalContext?.user;
  return (
    <nav
      className={`w-full px-6 py-3 bg-[#ffffffcc] sticky z-10 top-0 shadow flex justify-between items-center`}
    >
      <div className={`flex gap-5 items-center`}>
        <Title />
        <Subtitle>Job Application Manager</Subtitle>
      </div>
      <div className={`flex items-center gap-4`}>
        <NavMenuItem icon={faMoon} />
        {user?.username}
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Avatar imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&usqp=CAU" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <Link to="/login">
              <DropdownMenuItem>Login</DropdownMenuItem>
            </Link>
            <Link to="/register">
              <DropdownMenuItem>Register</DropdownMenuItem>
            </Link>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
