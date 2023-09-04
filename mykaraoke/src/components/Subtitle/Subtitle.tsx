import { ReactNode } from "react";
import "./index.scss";

interface ISubtitle {
  children: ReactNode;
}

export default function Subtitle({ children }: ISubtitle) {
  return <div className={`text-slate-600`}>{children}</div>;
}
