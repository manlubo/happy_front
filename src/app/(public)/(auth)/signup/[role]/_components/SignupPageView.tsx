import Block from "@/components/ui/Block";
import { UserRole } from "@/types/auth";

interface SignupPageViewProps {
  role: UserRole;
  email: string;
}

export default function SignupPageView({role, email}: SignupPageViewProps) {
    return (
        <div className="flex flex-col gap-12 max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-center">회원가입</h1>
          <Block className="rounded-lg p-8 ">
            <p>{role}</p>
            <p>{email}</p>
          </Block>
        </div>
    )
}