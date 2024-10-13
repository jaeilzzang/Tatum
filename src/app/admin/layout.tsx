import Sidebar from "@/components/sidebar";
import { Flex } from "@radix-ui/themes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { PropsWithChildren } from "react";

const AdminLayout = ({ children }: PropsWithChildren) => {
  const getUser = cookies().get("user");

  // 간략히 구현한 사용자 권한
  // 쿠키에 유저 데이터가 없다면 홈으로 리다이렉트

  // 미들웨어에서 처리해도 되지만
  // Route 마다 처리해주는 것은 admin 메인 도메인 layout 에서 auth guard를 만드는 것이 더 직관적이라 판단
  if (!getUser) {
    redirect("/");
  }

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
