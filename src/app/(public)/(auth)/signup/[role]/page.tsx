import { UserRole } from "@/types/auth";
import SignupPageView from "./_components/SignupPageView";
import z from "zod";
import { notFound } from "next/navigation";
import { verifyMailTokenApi } from "@/features/auth/api";
import { isApiAxiosError } from "@/lib/api/ResponseError";

interface SignupPageProps {
  params: Promise<{
    role: string;
  }>;
  searchParams: Promise<{
    token?: string;
  }>;
}


export default async function SignupPage({params, searchParams}: SignupPageProps) {
  const { token } = await searchParams;
  if (!token) notFound();
  
  let data;
  try {
    data = await verifyMailTokenApi(token);
  } catch (error) {
    if(isApiAxiosError(error)) {
      notFound();
    }
  }

  const {role} = await params;
  const RoleSchema = z.enum(UserRole);
  const parsedRole = RoleSchema.safeParse(role.toUpperCase());
  
  if(!parsedRole.success) notFound();

  
  return <SignupPageView role={parsedRole.data} email={data.data.email}/>;
}