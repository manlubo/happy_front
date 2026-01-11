import MainBlock from "./MainBlock";
import DonateCategory from "@/components/feature/category/DonateCategory";

export function CategoryBlock() {
  return (
    <MainBlock title="나의 도움이 필요한 후원처">
      <DonateCategory horizontal={false} size={32}/>
    </MainBlock>
  );
}