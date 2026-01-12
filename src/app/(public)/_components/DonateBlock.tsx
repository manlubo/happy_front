import Block from "@/components/ui/Block";

export default function DonateBlock() {
  return (
    <Block className="rounded-md">
      <div className="p-6 flex flex-col gap-4">
        <div className="flex justify-between items-center">
          <h3 className="text-base text-gray-700 font-semibold">전체 기부금</h3>
          <p className="text-sm text-gray-500">2026.01.12 기준</p>
        </div>
        <div className="bg-gray-100 p-2 rounded-md">
          <p className="font-semibold text-gray-700 text-center text-lg">1,000,000원</p>
        </div>
      </div>
      <div className="p-6 flex flex-col gap-4 bg-gray-100">
        <div className="flex justify-between items-center">
          <h3 className="text-base text-gray-700 font-semibold">내 기부금</h3>
          <p className="text-sm text-gray-500">2026.01.12 기준</p>
        </div>
        <div className="bg-white p-2 rounded-md">
          <p className="font-semibold text-gray-700 text-center text-lg">1,000,000원</p>
        </div>
      </div>
    </Block>
  );
}