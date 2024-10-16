### 환경

- "next": "14.2.15",
- "react": "^18",
- "react-dom": "^18"
- @radix-ui/themes + @radix-ui/primitive

---

### 폴더 구조

- src/app/
- src/app/admin/\*\*
- src/app/api/\*\*
- src/data => mock data

### 구현

- "/" : 로그인 페이지

  - email 은 mock user_list 에 있는 이메일 아무거나 사용 가능
  - 비밀번호 아무거나 5자 이상
  - 로그인 실패시 별도의 에러 메시지 UI 없음

- "/admin/user-list"

  - checkbox filter + select box + text field 필터 구현
  - invite User button role 로 구분
  - viewer는 요구사항대로 접근금지

- "/admin/tasks"

  - checkbox 멀티라인 연동 + select box + text field 필터 구현

  - Create Tasks button role 별로 구분

  ***

### 미구현 부분

시간이 부족으로 Create Tasks UI만 있고 기능은 구현하지 못했습니다.
