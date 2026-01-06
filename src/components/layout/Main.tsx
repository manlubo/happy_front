import Container from "./Container";

type MainProps = {
  children: React.ReactNode
}

export default function Main({children}: MainProps) {
  return (
    <main className="flex-1 my-16">
      <Container>
        {children}
      </Container>
    </main>
  );
}