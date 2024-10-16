import { UserDto } from "@/app/api/auth/type";
import { redirect } from "next/navigation";
import { useState, useEffect } from "react";

export const useAuth = (): UserDto | null => {
  const [user, setUser] = useState<UserDto | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const getUserJson = localStorage.getItem("user");

      if (!getUserJson) {
        redirect("/");
      }

      const { user } = JSON.parse(getUserJson);
      setUser(user);
    }
  }, []);

  return user;
};
