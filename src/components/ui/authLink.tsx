import UnderLineLink from "../common/UnderLineLink";

interface AuthLinkProps {
  page: "login" | "signup" | "findId" | "findPw";
  className?: string;
}
export default function AuthLink({page, className}: AuthLinkProps) {
  return (
    <div className={`flex text-sm w-full justify-center ${className}`}>
      {page !== "login" && <UnderLineLink href="/login" label="로그인"/>}
      {page !== "signup" && <UnderLineLink href="/signup" label="회원가입"/>}
      {page !== "findId" && <UnderLineLink href="/find-id" label="아이디 찾기"/>}
      {page !== "findPw" && <UnderLineLink label="비밀번호 찾기"/>}
    </div>
  );
}