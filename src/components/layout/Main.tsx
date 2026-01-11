import Container from "./Container";

type MainProps = {
  children: React.ReactNode
}

export default function Main({children}: MainProps) {
  return (
    <main className="flex-1 mb-16 mt-24 md:mt-28 lg:mt-32">
      <Container>
        {children}
      </Container>
    </main>
  );
}