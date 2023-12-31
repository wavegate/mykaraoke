import { faMoon } from "@fortawesome/free-solid-svg-icons";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import Subtitle from "../Subtitle/Subtitle";
import Title from "../Title/Title";
import Avatar from "../Avatar/Avatar";
import { Link } from "react-router-dom";
import { forwardRef, useContext } from "react";
import GlobalContext from "@/context/GlobalContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

const Header = forwardRef<any, any>((_, ref) => {
  const globalContext = useContext(GlobalContext);
  const user = globalContext?.user;
  return (
    <nav
      className={`w-full px-6 py-3 bg-[#ffffffcc] fixed z-10 top-0 shadow flex justify-between items-center`}
      ref={ref}
    >
      <div className={`flex gap-5 items-center`}>
        <Title />
        <Subtitle>Argos Jobs</Subtitle>
      </div>
      {/* <div className={`flex items-center gap-4`}>
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
      </div> */}
    </nav>
  );
});

export default Header;
