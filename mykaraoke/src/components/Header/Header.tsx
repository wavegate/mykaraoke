import { faMoon } from "@fortawesome/free-solid-svg-icons";
import NavMenuItem from "../NavMenuItem/NavMenuItem";
import Subtitle from "../Subtitle/Subtitle";
import Title from "../Title/Title";
import "./index.scss";
import Avatar from "../Avatar/Avatar";
import Dropdown from "../Dropdown/Dropdown";

interface IHeader {}

export default function Header({}: IHeader) {
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
        <Dropdown
          trigger={
            <Avatar imgSrc="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZ6th-oTbkDMbDOPGU_kkRMM55lfvRYgM8JA&usqp=CAU" />
          }
          content={
            <div className={`w-max`}>
              This is a section that will be displayed on hover.
            </div>
          }
          gap={12}
          position="bottomRight"
        ></Dropdown>
      </div>
    </nav>
  );
}
