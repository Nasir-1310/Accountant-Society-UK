// components/Container.tsx

import { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
}

const Container = ({ children }: ContainerProps) => {
  return (
    <div className="px-3 md:px-6 lg:px-8 xl:px-[60px] 2xl:px-[620px] py-3">
      {children}
    </div>
  );
};

export default Container;
