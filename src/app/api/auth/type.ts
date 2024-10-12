export type UserRole = "Admin" | "Viewer" | "RegularUser" | "PrimeUser";

export type UserDto = {
  userName: string;
  userPhone: string;
  userEmail: string;
  userRole: UserRole;
  createdAt: Date;
  lastLoggedInAt: Date;
};

export interface AuthLoginDto extends Pick<UserDto, "userEmail"> {
  password: string;
}
