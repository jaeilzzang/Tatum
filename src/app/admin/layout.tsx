import Sidebar from "@/components/sidebar";
import { Flex } from "@radix-ui/themes";
import React, { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  return (
    <main>
      <Flex width={"100%"}>
        <Sidebar />
        {children}
      </Flex>
    </main>
  );
};

export default AdminLayout;
