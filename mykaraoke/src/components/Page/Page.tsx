import { ReactNode } from "react";
import "./index.scss";

interface IPage {
  children: ReactNode;
}

export default function Page({ children }: IPage) {
  return <div className={`p-[24px]`}>{children}</div>;
}
