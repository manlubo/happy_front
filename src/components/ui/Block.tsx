type BlockProps = {
  children: React.ReactNode;
  className? :string;
}

export default function Block({ children, className = "" }: BlockProps) {
  return (
    <div className={`w-full border border-gray-200 ${className}`}>
      {children}
    </div>
  );
}