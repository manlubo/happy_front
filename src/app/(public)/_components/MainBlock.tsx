import Block from "../../../components/ui/Block";

type MainBlockProps = {
  title?: string;
  sub?: string;
  children: React.ReactNode;
}

export default function MainBlock({ title, sub, children }: MainBlockProps) {
  return (
    <Block className="rounded-xl p-6 flex flex-col gap-2">
      <h2 className="text-lg md:text-xl font-semibold text-gray-700">{title}</h2>
      {sub && <p className="text-base text-gray-500">{sub}</p>}
      {children}
    </Block>
  );
}