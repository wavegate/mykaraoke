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
            {/* <Button variant="ghost" className="h-8 w-8 p-0"> */}
            <Avatar imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&usqp=CAU" />
            {/* </Button> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(job.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <Link to="/login">Login</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link to="/register">Register</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
}
