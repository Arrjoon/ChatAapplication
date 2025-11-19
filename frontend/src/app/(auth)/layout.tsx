import { ReactNode } from "react";


interface Props {
  children: ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className={"flex min-h-svh flex-col items-center justify-center"}>
      <div className={"w-full"}>
      {children}
      </div>
    </div>
  );
};

export default Layout;
