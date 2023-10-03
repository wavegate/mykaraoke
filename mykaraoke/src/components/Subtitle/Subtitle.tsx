import { ReactNode } from "react";

interface ISubtitle {
  children: ReactNode;
}

export default function Subtitle({ children }: ISubtitle) {
  return <div className={`text-slate-600`}>{children}</div>;
}
