import path from "path";
import { promises as fs } from "fs";
import { UserDto } from "../type";

export async function POST(req: Request) {
  const filePath = path.join(process.cwd(), "src", "data", "user_list.json");

  const body = await req.json();

  const jsonData = await fs.readFile(filePath, "utf-8");
  const data: UserDto[] = JSON.parse(jsonData);

  const invalidUser = data.find((e) => e.userEmail === body.userEmail);

  if (!invalidUser) {
    return new Response(null, {
      status: 400,
      statusText: "not found user",
    });
  }

  return new Response(JSON.stringify({ user: invalidUser }), {
    status: 200,
    headers: {
      // 권한인증에 대한 부분
      // 비밀번호 입력이 자유롭기 때문에 JWT토큰을 만드는 것은 큰 의미가 없다고 판단
      // JWT 토큰 대신 쿠키의 4kb 크기를 감안해서 email만 저장하는 것을 고민했지만
      // 별도의 암호화는 이루어지지 않았지만 user data 전부를 내려줌
      // 실제 프로덕트에서는 이렇게 하지 않지만 과제의 요구사항을 위해 작성 함
      "Set-Cookie": `user=${JSON.stringify(
        invalidUser
      )}; HttpOnly; SameSite=None; Secure; Path=/;`,
    },
  });
}
