'use client'

import MainBanner from "./MainBanner";
import { API_BASE_URL } from "@/lib/env"
import { useSelector } from "react-redux"
import { RootState } from "@/stores"
import Block from "@/components/ui/Block";
import UserBlock from "@/components/ui/UserBlock";
import { CategoryBlock } from "./CategoryBlock";
import ExpireDonateBlock from "./ExpireDonateBlock";

export default function MainPageView() {
  const user = useSelector((state: RootState) => state.auth.user);

  return (
    <div className="flex gap-12">
      <div className="flex-8 flex flex-col gap-6">
        <MainBanner/>
        <CategoryBlock/>
        <ExpireDonateBlock/>
      </div>
      <div className="hidden lg:flex flex-4 flex-col gap-6">
        <UserBlock/>
        <Block className="rounded-lg p-6">
          <div>API_BASE_URL : {API_BASE_URL}</div>
          <div>user_id : {user?.id}</div>
          <div>user_name : {user?.name}</div>
          <div>user_roles : {user?.roles}</div>
          <div>user_profile : {user?.profile}</div>
          <div>user_status : {user?.status}</div>
        </Block>
      </div>
    </div>
  );
}